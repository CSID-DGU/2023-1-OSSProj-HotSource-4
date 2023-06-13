import {
    HStack,
    Text,
    GridItem,
    VStack,
    Box,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Flex,
    Spinner, useToast
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import MemoBox from "./memoBox";
import {gql, useMutation, useQuery} from "@apollo/client";
import ChatBox from "./chatBox";

const USER = gql`
query Users {
  users {
    _id
    username
  }
}
`

const UPDATE_GROUP = gql`
mutation UpdateGroup($groupId: ID!, $submissionStatus: Boolean, $assignmentPeriod: AssignmentPeriodInput, $gradeReleaseDate: DateTime, $extensionAllowed: Boolean) {
  updateGroup(groupId: $groupId, submissionStatus: $submissionStatus, assignmentPeriod: $assignmentPeriod, gradeReleaseDate: $gradeReleaseDate, extensionAllowed: $extensionAllowed) {
    _id
  }
}
`

const DELETE_GROUP = gql`
mutation DeleteGroup($groupId: ID!) {
  deleteGroup(groupId: $groupId) {
    _id
  }
}
`


const Group = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {data, loading } = useQuery(USER,{
        onError(graphQLError){
        console.log(graphQLError)
    }})

    const [ updateGroup, { } ] = useMutation(UPDATE_GROUP,{
        onCompleted : data => {;
        },
        onError(graphEQError){
            console.log(graphEQError);
        }
    })

    const [ deleteGroup, {} ] = useMutation(DELETE_GROUP, {
        variables : {
            groupId : props.group._id
        },
        onCompleted: data => {
            addToast("성공적으로 삭제했습니다", "success");
        }
    })

    const get_username = (item) => {
        for(let i = 0; i < data.users.length; i++){
            if (data.users[i]._id == item) return data.users[i].username;
        }
    }

    const get_date = (today) => {
        const td = new Date(today);
        const year = td.getFullYear();
        const month = ('0' + (td.getMonth() + 1)).slice(-2);
        const day = ('0' + td.getDate()).slice(-2);

        const dateString = year + '-' + month  + '-' + day;


        const hours = ('0' + td.getHours()).slice(-2);
        const minutes = ('0' + td.getMinutes()).slice(-2);
        const seconds = ('0' + td.getSeconds()).slice(-2);

        const timeString = hours + ':' + minutes  + ':' + seconds;

        return dateString + ' ' + timeString
    }

    function handleDeleteGroup () {
        deleteGroup();
    }

    const toast = useToast()
    const toastIdRef = useRef()
    function addToast(text, type) {
        toastIdRef.current = toast(
            {
                description: text,
                status: type
            })
    }

    useEffect(() => {
        if(Date.parse(props.group.assignmentPeriod.end) - Date.now() < 0) {
            updateGroup({
                variables : {
                    groupId : props.group._id,
                    submissionStatus : true
                }
            })
        }

    }, [])



    if (loading) return <Spinner />
    if (!loading ) return(
    <>
        <GridItem w="100%" borderColor="blackAlpha.300" borderWidth={1} shadow="dark-lg">
            <VStack spacing={2}>
                <Box w="100%" bgColor="#ECEEF1" p={3} >
                    <HStack justify="space-between">
                        <HStack>
                            <Text fontWeight="700" >{props.group.name}</Text>
                            { !props.group.submissionStatus ? <Text color="blue.500" fontWeight="800">[ 진행중 ]</Text> : <Text color="red.400" fontWeight="800">[ 마감 ]</Text> }
                        </HStack>
                        <Box>
                            <HStack>
                                { !props.group.submissionStatus && !props.user.isAdmin ?
                                    <Button onClick={onOpen} size="xs" bgColor="blackAlpha.700" colorScheme="blackAlpha" textColor="whiteAlpha.800" borderRadius={0}>팀 활동 </Button>
                                    :
                                    <Button  size="xs" bgColor="blackAlpha.700" colorScheme="blackAlpha" textColor="whiteAlpha.800" borderRadius={0} onClick={handleDeleteGroup}>삭제 </Button>
                                }
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
                <Box w="100%" bgColor="whiteAlpha.800" >
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th bgColor="blackAlpha.700" textAlign="center">
                                    <Text fontSize="15" textColor="white">활동 기간</Text>
                                </Th>
                                <Th bgColor="blackAlpha.800" textAlign="center">
                                    <Text fontSize="15" textColor="white">성적공개일자</Text>
                                </Th>
                                <Th bgColor="blackAlpha.700" textAlign="center">
                                    <Text fontSize="15" textColor="white">연장제출</Text>
                                </Th>
                                <Th bgColor="blackAlpha.800" textAlign="center">
                                    <Text fontSize="15" textColor="white">종료여부</Text>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">{get_date(props.group.assignmentPeriod.start)} ~ {get_date(props.group.assignmentPeriod.end) }</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">{get_date(props.group.gradeReleaseDate)}</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    {props.group.extensionAllowed ? <Text fontSize="12" textColor="blackAlpha.700">허용</Text> : <Text fontSize="12" textColor="blackAlpha.700">비허용</Text>}
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    {props.group.submissionStatus ? <Text fontSize="12" textColor="blackAlpha.700">종료</Text> : <Text fontSize="12" textColor="blackAlpha.700">진행중</Text>}
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                <Box p={2} bgColor="#ECEEF1" w="100%" borderRadius={5}>
                    <HStack>
                    <Text fontSize="14px" fontWeight="600">참여자  </Text>
                    {props.group.members.filter((item, index) => index != 0).map((item, index)=> (
                        <Text fontSize="13px" >{ get_username(item._id) }</Text>
                    )) }
                    </HStack>
                </Box>

            </VStack>
        </GridItem>
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            size="full"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="40px" fontWeight="800">팀 활동 </ModalHeader>
                <ModalBody>
                    <Flex dir="row">
                        <MemoBox allUser={data} user={props.user} group={props.group} title={props.title}  />
                        <ChatBox allUser={data} user={props.user} group={props.group} title={props.title} />
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button bgColor="#F28F16" colorScheme='orange' mr={3} fontWeight="800" onClick={onClose}>
                    팀 활동 종료
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}

export default Group;