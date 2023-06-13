import {Button, HStack, Spinner, useToast} from "@chakra-ui/react";
import {gql, useMutation} from "@apollo/client";
import {useRef} from "react";

const CREATE_GROUP = gql`
mutation CreateGroup($name: String!, $assignmentPeriod: AssignmentPeriodInput!, $gradeReleaseDate: DateTime!, $extensionAllowed: Boolean!, $subjectId: ID!) {
  createGroup(name: $name, assignmentPeriod: $assignmentPeriod, gradeReleaseDate: $gradeReleaseDate, extensionAllowed: $extensionAllowed, subjectId: $subjectId) {
    _id
  }
}
`
const ADD_GROUP = gql`
mutation AddUserToGroup($userId: ID!, $groupId: ID!) {
  addUserToGroup(userId: $userId, groupId: $groupId) {
    _id
  }
}
`

const CreateGroupButton = (props) => {

    const [addUserToGroup, {}] = useMutation(ADD_GROUP,  {
        update(proxy, {data: {addUserToGroup: userData }}) {
        },
        onError({graphQLErrors}){
            console.log(graphQLErrors[0].message);
        }
    })

    const [createGroup, {loading}] = useMutation(CREATE_GROUP, {
        variables: {
            name: props.group.name,
            assignmentPeriod : {
                start : props.group.assignmentPeriod.start,
                end : props.group.assignmentPeriod.end
            },
            gradeReleaseDate : props.group.gradeReleaseDate,
            extensionAllowed : props.group.extensionAllowed,
            subjectId : props.group.subjectId
        },
        onCompleted: (groupData) => {
            props.selectedUser.map((item, index) => {
                addUserToGroup({
                    variables : {
                        userId : props.selectedUser[index].id,
                        groupId : groupData.createGroup._id
                    }
                })
            })
            addSuccessToast()
            props.onClose()


        },
        onError({graphQLErrors}){
            console.log(graphQLErrors[0].message);
            if(graphQLErrors[0].message.includes("Group name is required")) addErrorToast1()
            if(graphQLErrors[0].message.includes("assignmentPeriod.start: Path `assignmentPeriod.start` is required.")) addErrorToast2()
            if(graphQLErrors[0].message.includes("assignmentPeriod.end: Path `assignmentPeriod.end` is required")) addErrorToast3()
            if(graphQLErrors[0].message.includes("gradeReleaseDate: Path `gradeReleaseDate` is required.")) addErrorToast4()
            if(graphQLErrors[0].message.includes("Group name should not exceed 50 characters")) addErrorToast5()
            if(graphQLErrors[0].message.includes("Group name already exists")) addErrorToast6()
        }
    })

    const handleAddToGroup = () => {

    }

    const handleCreateGroup = () => {
        if(props.selectedUser.length == 0) addErrorToast0()
        else createGroup()
    }

    //TOAST
    const toast = useToast()
    const toastIdRef = useRef()

    function addErrorToast0() {
        toastIdRef.current = toast(
            {
                description: "수강생을 추가해주세요",
                status: 'error'
            })
    }
    function addErrorToast1() {
        toastIdRef.current = toast(
            {
                description: "과제 이름을 입력해주세요",
                status: 'error'
            })
    }
    function addErrorToast2() {
        toastIdRef.current = toast(
            {
                description: "과제 시작일을 입력해주세요",
                status: 'error'
            })
    }
    function addErrorToast3() {
        toastIdRef.current = toast(
            {
                description: "과제 마감일을 입력해주세요",
                status: 'error'
            })
    }
    function addErrorToast4() {
        toastIdRef.current = toast(
            {
                description: "성적 공개일을 설정해주세요",
                status: 'error'
            })
    }
    function addErrorToast5() {
        toastIdRef.current = toast(
            {
                description: "제목을 50자 미만으로 설정해주세요",
                status: 'error'
            })
    }
    function addErrorToast6() {
        toastIdRef.current = toast(
            {
                description: "해당 그룹이 이미 존재합니다",
                status: 'error'
            })
    }
    function addSuccessToast() {
        toastIdRef.current = toast(
            {
                description: "성공적으로 그룹을 생성하였습니다",
                status: 'success'
            })
    }

    if (loading) return (<Spinner />)
    if (!loading) return (
        <HStack mr={5} justifyContent="end">
            <Button colorScheme='orange' bgColor="#F28F16" mr={3} fontWeight="800" onClick={handleCreateGroup} >
                만들기
            </Button>
            <Button colorScheme='orange' bgColor="#F28F16" mr={3} fontWeight="800" onClick={props.onClose} >
                닫기
            </Button>
        </HStack>
    )
}

export default CreateGroupButton;