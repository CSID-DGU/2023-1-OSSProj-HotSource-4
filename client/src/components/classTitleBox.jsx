import {
    Box,
    Button,
    Container,
    Divider,
    HStack,
    Menu,
    MenuButton, MenuItem,
    MenuList, Spinner,
    StackDivider,
    Text, useToast
} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon, EmailIcon, InfoIcon} from "@chakra-ui/icons";
import {useContext, useEffect, useRef, useState} from "react";
import {gql, useQuery} from "@apollo/client";
import {AuthContext} from "../context/authContext";
import MenuLists from "./menuLists";
import TitleBox from "./titleBox";
import MenuLists_admin from "./optionLists";
import OptionLists from "./optionLists";

const QUERY_USER = gql`
    query User($userId: ID!) {
       user(userId: $userId) {
        email
        isAdmin
        _id
        subjects {
          _id
        }
        username
      }
    }
`

const ClassTitleBox = (props) => {

    const [hidden, setHidden] = useState(false);


    const context = useContext(AuthContext);
    const values = { userId : context.user.userId };
    const { data, loading, error } = useQuery(QUERY_USER, {
        variables: values,
        onError(graphglError){
            console.log(graphglError);
        }
    });



    const handleTopBox = () => {
        setHidden(!hidden);
    }



    if(loading) return (<Spinner />)
    if(!loading) return (
        <>
            <TitleBox hidden={hidden} data={data} title={props.title} setTitle={props.setTitle}/>
            <Container
                bgGradient='linear(to-t, #A0A0A0 0%, #F0F0F0 100%)'
                maxW="80%"
                h="50px"
            >
                <HStack
                    justify="space-between"
                    pt={3}
                >

                    <OptionLists data={data} setTitle={props.setTitle} />
                    <Button onClick={handleTopBox} size="xl" w="30px">
                        {hidden ? <ChevronDownIcon /> : <ChevronUpIcon />  }
                    </Button>
                    <Button
                        fontSize={13}
                        p={1}
                        border="solid"
                        borderColor="blackAlpha.300"
                        borderWidth="1px"
                        bgColor="whiteAlpha.800"
                        size="xl"
                    >
                        <InfoIcon mr={1} />
                        강의계획서
                    </Button>
                </HStack>

            </Container>
        </>
    )
}


export default ClassTitleBox;