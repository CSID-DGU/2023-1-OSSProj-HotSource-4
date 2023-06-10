import {
    Box,
    Button,
    Grid,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Spinner,
    useDisclosure, useToast,
} from "@chakra-ui/react";
import {useEffect, useRef, useState} from "react";
import GroupProject from "./groupProject.jsx";
import CreateGroupModal from "./createGroupModal";
import {gql, useQuery} from "@apollo/client";

const SUBJECT_GROUP = gql`
query SubjectGroups($subjectId: ID!) {
  subjectGroups(subjectId: $subjectId) {
    submissionStatus
    name
    members {
      _id
    }
    gradeReleaseDate
    extensionAllowed
    assignmentPeriod {
      start
      end
    }
    _id
  }
}
`


const GroupProjectList = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [selectedUser, setSelectedUser ] = useState([]);
    const [group, setGroup ] = useState({
        name : "",
        assignmentPeriod : {
            start : "",
            startValue: "",
            end : "",
            endValue: ""
        },
        gradeReleaseDate : "",
        gradeReleaseDateValue: "",
        extensionAllowed : false,
        subjectId : props.title
    });

    const { data, loading } = useQuery(SUBJECT_GROUP,
        {
            variables : { subjectId : props.title },
            onError(graphQLError) {
                console.log(graphQLError);
            }
        })

    console.log(data);


    const toast = useToast()
    const toastIdRef = useRef()
    const [show, setShow] = useState(false)

    function addErrorToast(name) {
        toastIdRef.current = toast(
            {
                description: "페이지 이탈로 값을 초기화하였습니다",
                status: 'error'
            })
    }

    function searchingMember (item) {
        for(let i = 0; i < item.length; i++){
            if(item[i]._id == props.user._id) return true
        }
    }


     if(loading) return <Spinner />
     if(!loading) return (
        <>
        <Box overflow="scroll" w="100%" h="600px">
            <Box >
                {(props.user.isAdmin) ? <Button onClick={onOpen} bgColor="#F28F16" colorScheme="orange" size="sm" m={2}>
                    팀 활동 추가하기
                </Button> : <Box /> }
            </Box>
            <Box>
                <Grid gap="70px">
                    {data.subjectGroups.filter(item =>  searchingMember(item.members)).map((item, index)=> (
                        <GroupProject group={item} index={index} user={props.user} title={props.title} />
                    ) ) }
                </Grid>
            </Box>

        </Box>
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            size="xl"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="40px" fontWeight="800">팀 활동 추가 </ModalHeader>
                <ModalBody>
                    <CreateGroupModal
                        user={props.user}
                        title={props.title}
                        group={group}
                        setGroup={setGroup}
                        selectedUser={selectedUser}
                        setSelectedUser={setSelectedUser}
                        onClose={onClose}
                    />
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )

}


export default GroupProjectList;