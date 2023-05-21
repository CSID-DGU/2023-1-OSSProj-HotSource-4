import {
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    MenuButton,
    Button,
    MenuList,
    MenuItem,
    Menu,
    Checkbox, VStack, HStack, Thead, Tr, Th, Table, Td, Progress, Tbody
} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import Card from "./card.jsx"


const GridList = (props) => {
    const [ inProgress, setInProgress ] = useState(true);
    const [ done, setDone ] = useState(true)
    const [ index, setIndex ] = useState([])

    useEffect(() => {

    }, [])


    return (
        <Box overflow="scroll" w="100%" h="600px">
            <HStack bgColor="blackAlpha.800" p={3} mb={10} borderRadius={10} spacing={10}>
                <Checkbox defaultChecked colorScheme="orange" m={2}><Text fontSize="15px" fontWeight="700" textColor="white">진행중인 팀 활동</Text></Checkbox>
                <Checkbox defaultChecked colorScheme="orange" m={2}><Text fontSize="15px" fontWeight="700" textColor="white">마감된 팀 활동</Text></Checkbox>
            </HStack>

            <Grid gap="70px">
                <Card {...props}>
                    CHILDREN
                </Card>
                <Card {...props}>
                    CHILDREN
                </Card>
                <Card {...props}>
                    CHILDREN
                </Card>
                <Card {...props}>
                    CHILDREN
                </Card>
                <Card {...props}>
                    CHILDREN
                </Card>

            </Grid>
        </Box>
    )

}


export default GridList;