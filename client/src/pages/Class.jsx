import {
    Box,
    Container,
    Flex, Spinner, useToast
} from "@chakra-ui/react";
import {useContext, useRef, useState} from "react";
import NavBar from "../components/navBar";
import Footer from "../components/footer";
import ClassAccordionTab from "../components/classAccordionTab";
import ClassLearningContent from "../components/classLearningContent";
import ClassTitleBox from "../components/classTitleBox";
import ClassActivityContent from "../components/classActivityContent";
import {gql, useQuery} from "@apollo/client";
import {AuthContext} from "../context/authContext";

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


const Class = (props) => {

    const [title, setTitle] = useState("");
    const [index, setIndex ] = useState(0);
    const [tab, setTab ] = useState(0);

    const context = useContext(AuthContext);
    const values = { userId : get_userId() };
    const { data, loading, error } = useQuery(QUERY_USER, {
        variables: values,
        onError(graphglError){
            console.log(graphglError);
        }
    });

    const setContents = (n, m) => {
        setIndex(n);
        setTab(m);
    }

    function get_userId () {
        if(localStorage.getItem("token")) return context.user.userId
        else {
            window.location.replace("/login");
        }
    }

    if(loading) return (<Spinner />)
    if(!loading) return (<>
        <NavBar />
        <ClassTitleBox title={title} setTitle={setTitle}/>

        <Container
            maxW="80%"
            p={0}
        >
            <Flex>
                <ClassAccordionTab setContets={setContents}/>
                {(index == 0) ? <ClassLearningContent tab={tab} setTab={setTab} title={title} setTitle={setTitle} user={data.user} /> : <Box />}
                {(index == 2) ? <ClassActivityContent tab={tab} setTab={setTab} title={title} setTitle={setTitle} user={data.user} /> : <Box />}
            </Flex>
            <Footer />
        </Container>

    </>)
}

export default Class;