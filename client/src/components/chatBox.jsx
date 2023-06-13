import {
    Box,
    Button,
    HStack,
    Input,
    Popover, PopoverArrow, PopoverBody, PopoverCloseButton,
    PopoverContent, PopoverHeader,
    PopoverTrigger,
    Spinner,
    Text,
    VStack
} from "@chakra-ui/react";
import {BsFillSendFill} from "react-icons/bs";
import {useEffect, useState} from "react";
import {gql, useMutation, useQuery} from "@apollo/client";
import Layout from "../Layout/showUpLayout";

const SEND_MESSAGE = gql`
mutation SendMessage($content: String!, $groupId: ID!) {
  sendMessage(content: $content, groupId: $groupId) {
    _id
  }
}
`

const QUERY_MESSAGE = gql`
query Messages($groupId: ID!) {
  messages(groupId: $groupId) {
    user {
      _id
    }
    createdAt
    content
    isCurrentUser
  }
}
`


const ChatBox = (props) => {

    const [message, setMessage ] = useState("")
    const [ active, setActive ] = useState(false)

    const { data, loading } = useQuery(QUERY_MESSAGE, {
        variables : {
            groupId : props.group._id
        },
        pollInterval : 100,
    })

    useEffect(() => {
        if(!loading) {
            refresh();
            setActive(true);
        }

    }, [loading])


    const [ sendMessage, { } ] = useMutation(SEND_MESSAGE, {
        variables : {
            content : message,
            groupId : props.group._id
        },
        onCompleted : data => {
            setMessage("");
        },
        onError(graphQLError){
            console.log(graphQLError);
        }
    })

    const handleMassageChange = (event) => {
        setMessage(event.target.value);
    }
    const handleMessageSend = () => {
        if(message == "") return;
        sendMessage();

    }

    const enterkey = () => {
        if (window.event.keyCode == 13) {
            handleMessageSend();
            setMessage("");
        }
    }

    const refresh = () => {
        let mySpace = document.getElementById("groupChatBox");
        if (mySpace) mySpace.scrollTop = mySpace.scrollHeight;
    }

    const get_username = (item) => {
        for(let i = 0; i < props.allUser.users.length; i++){
            if(item._id == props.allUser.users[i]._id) {
                return props.allUser.users[i].username;
            }
        }
    }

    const get_time = (time) => {

        const td = new Date(time);

        const month = ('0' + (td.getMonth() + 1)).slice(-2);
        const day = ('0' + td.getDate()).slice(-2);
        const hours = ('0' + td.getHours()).slice(-2);
        const minutes = ('0' + td.getMinutes()).slice(-2);

        return month + "월" + day + "일 " + hours + ':' + minutes
    }

    if (loading) return (<Spinner /> )
    if (!loading) return (
        <Box
            flex={3}
            w="100%"
            h="500px"
            bgColor="#ECEEF1"
            borderRadius="15px"
        >
            <VStack >
                <Box
                    w="100%"
                    bgColor="#ECEEF1"
                    p={2}
                >
                    <HStack  justify="space-between" >
                        <Text mt={1} mx={2} fontWeight="700" > 채팅 </Text>
                        <Box>
                            <Popover>
                                <PopoverTrigger >
                                    <Button
                                        variant='ghost'
                                        colorScheme="blackAlpha"
                                        size="sx"
                                        fontSize="12px"
                                        fontWeight="700"
                                        letterSpacing="1px"
                                    >
                                        팀원보기
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader>그룹에 참여하고 있는 사람</PopoverHeader>
                                    <PopoverBody>
                                            {props.group.members.filter((item, index) => index != 0).map((item, index)=> (
                                                    <Text fontSize="14px" >{ get_username(item) }</Text>
                                            )) }
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Box>
                    </HStack>
                </Box>
                <Box
                    w="100%"
                    h="380px"
                    bgColor="blackAlpha.800"
                    id="groupChatBox"
                    overflow="scroll"
                    p={3}>
                    {data.messages.map((item, index) => (
                        <>
                            {item.user._id == props.user._id ?
                                    <Layout>
                                        <Text textAlign="end" fontWeight="700" fontSize="14px" color="whiteAlpha.900">{get_username(item.user)}</Text>
                                        <HStack justifyContent="end">
                                            <Box px={3} py={2} maxW="60%" bgColor="#F5F1E0" borderRadius="10px" >{item.content}</Box>
                                        </HStack>
                                        <Text textAlign="end" mb={5} fontWeight="500" fontSize="10px" color="whiteAlpha.700">{get_time(item.createdAt)}</Text>
                                    </Layout>
                                        :
                                    <Layout>
                                        <Text textAlign="start" fontWeight="700" fontSize="14px" color="whiteAlpha.900">{get_username(item.user)}</Text>
                                        <HStack justifyContent="start">
                                            <Box px={3} py={2} maxW="60%" bgColor="white" borderRadius="10px">{item.content}</Box>
                                        </HStack>
                                        <Text textAlign="start" mb={5} fontWeight="500" fontSize="10px" color="whiteAlpha.700">{get_time(item.createdAt)}</Text>
                                    </Layout>
                            }
                            {active ? refresh() : null}
                        </>
                    ) )}

                </Box>
                <Box w="95%" >
                    <HStack mt={1} p={1} align="space-between">
                        <Input
                            bgColor="whiteAlpha.700"
                            onKeyUp={enterkey}
                            onChange={handleMassageChange}
                            value={message}
                            placeholder="채팅을 입력하세요"
                            focusBorderColor='#F28F16'
                            size='md'
                        />
                        <Button
                            bgColor="#F28F16"
                            colorScheme="orange"
                            onClick={handleMessageSend}
                        >
                            <BsFillSendFill />
                        </Button>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    )
}


export default ChatBox;