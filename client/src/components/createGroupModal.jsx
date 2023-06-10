import {
    Container,
    Heading,
    Box,
    Select,
    HStack,
    VStack,
    useToast,
    Input,
    Checkbox,
    Button, Text, Spinner
} from "@chakra-ui/react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {ChevronDownIcon} from "@chakra-ui/icons";
import {useEffect, useRef, useState} from "react";
import CreateGroupButton from "./createGroupButton";

const QUERY_SUBJECT = gql`
query Subject($subjectId: ID!) {
  subject(subjectId: $subjectId) {
    name
    classification
    credit
    capacity
    users {
      _id
      username
      email
      groups {
        _id
      }
    }
  }
}
`

const CreateGroupModal = (props) => {

    useEffect(() => {
        props.setGroup({
                name : "",
                assignmentPeriod : {
                    start : "",
                    startValue: NaN,
                    end : "",
                    endValue: NaN
                },
                gradeReleaseDate : "",
                gradeReleaseDateValue : NaN,
                extensionAllowed : false,
                subjectId : props.title
            },
        )
        props.setSelectedUser([]);
    }, [])

    const handleGroupNmChange = (event) => props.setGroup({ ...props.group, name : event.target.value })
    const handleGroupPdStartChange = (event) => {
        if(Date.parse(event.target.value) - props.group.assignmentPeriod.endValue > 0){
            console.log(Date.parse(event.target.value) - props.group.assignmentPeriod.endValue)
            props.setGroup({...props.group, assignmentPeriod : {
                    ...props.group.assignmentPeriod,
                    start : "",
                    startValue : ""
                }
            })
            addErrorDateToast()
        }
        else {
            props.setGroup({...props.group, assignmentPeriod : {
                    ...props.group.assignmentPeriod,
                    start : event.target.value,
                    startValue : Date.parse(event.target.value)
                }
            })
        }

    }
    console.log(props.group.assignmentPeriod)
    const handleGroupPdEndChange = (event) => {
        if(props.group.assignmentPeriod.startValue - Date.parse(event.target.value) > 0  ||
            Date.parse(event.target.value) - props.group.gradeReleaseDateValue > 0)
        {
            props.setGroup({...props.group, assignmentPeriod : {
                    ...props.group.assignmentPeriod,
                    end : "",
                    endValue : ""
                }
            })
            addErrorDateToast()
        }
        else props.setGroup({...props.group, assignmentPeriod : {
                ...props.group.assignmentPeriod,
                end : event.target.value,
                endValue: Date.parse(event.target.value)
            } })
    }
    console.log(props.group.subjectId)
    console.log(props.selectedUser)

    const handleGradeReleaseChange = (event) => {
        if(props.group.assignmentPeriod.endValue - Date.parse(event.target.value) > 0 ){
            props.setGroup(
                {
                    ...props.group,
                    gradeReleaseDate : "",
                    gradeReleaseDateValue: ""
                }
            )
            addErrorDateToast()
        }
        else {
            props.setGroup(
                {
                    ...props.group,
                    gradeReleaseDate : event.target.value,
                    gradeReleaseDateValue: Date.parse(event.target.value)
                },

            )
        }
    }

    const handleExtendAllowedChange = (event) => {
        console.log(event.target.checked);
        props.setGroup(
            {
                ...props.group,
                extensionAllowed : event.target.checked
            },
        )
    }

    function get_id (title) {
        if(!title) return "6471ea1d8c0d64b3c26745d4"
        return props.title;
    }
    async function changeSelection() {
        const selectedItem = await document.getElementById("select_user");
        const indexNum = await selectedItem[selectedItem.selectedIndex].id;
        const id = data.subject.users[indexNum]._id
        const username = data.subject.users[indexNum].username
        const email = data.subject.users[indexNum].email.split('@')[0]

        if ( props.selectedUser.filter(item => item.id == id).length != 0 ) addErrorToast(username)
        else await props.setSelectedUser(selectedUser => [...selectedUser, {id : id, username : username, email : email}]);

    }

    function handleDeleteClick(event) {
        console.log(event.target.value)
        props.setSelectedUser(props.selectedUser.filter( (item, index) => index != event.target.value ))
    }

    const _id = props.title;
    const values = { subjectId : _id};
    const { data, loading, error } = useQuery(QUERY_SUBJECT, {
        variables: values,
        onError(graphglError){
            console.log(graphglError);
        }
    });

    const toast = useToast()
    const toastIdRef = useRef()
    const [show, setShow] = useState(false)

    function addErrorToast(name) {
        toastIdRef.current = toast(
            {
                description: `${name}님은 이미 존재합니다.`,
                status: 'error'
            })
    }

    function addErrorDateToast(name) {
        toastIdRef.current = toast(
            {
                description: "마감일이 시작일보다 빠릅니다.",
                status: 'error'
            })
    }

    if (loading) return (<Spinner />)
    if (!loading) return (<>
        <Box p={2} >
            <Heading as="h3" fontSize="20px" textColor="#362D18" m={2}>
                과제 이름
            </Heading>
            <Input
                isRequired
                focusBorderColor='#F28F16'
                placeholder='제목을 입력해주세요'
                value={props.group.name}
                onChange={handleGroupNmChange}
                mb={5}
            />

            <Heading as="h3" fontSize="20px" textColor="#362D18" m={2}>
                과제 기간 설정
            </Heading>
            <HStack mb={5}>
            <Input
                isRequired
                size="sm"
                type="datetime-local"
                bgColor="whiteAlpha.800"
                value={props.group.assignmentPeriod.start}
                onChange={handleGroupPdStartChange}
            />
            <Input
                isRequired
                size="sm"
                type="datetime-local"
                bgColor="whiteAlpha.800"
                value={props.group.assignmentPeriod.end}
                onChange={handleGroupPdEndChange}
            />
            </HStack>

            <Heading as="h3" fontSize="20px" textColor="#362D18" m={2}>
                성적 공개일
            </Heading>
            <Input
                isRequired
                size="sm"
                type="datetime-local"
                bgColor="whiteAlpha.800"
                mb={5}
                value={props.group.gradeReleaseDate}
                onChange={handleGradeReleaseChange}
            />
            <Heading as="h3" fontSize="20px" textColor="#362D18" m={2}>
                연장제출
            </Heading>
            <Checkbox
                ml={5}
                mb={5}
                colorScheme="orange"
                size='md'
                isChecked={props.group.extensionAllowed}
                onChange={handleExtendAllowedChange}
            >
                허용
            </Checkbox>



            <Heading as="h3" fontSize="20px" textColor="#362D18" m={2}>
                수강생 조회
            </Heading>
            <Select maxH="25px"
                    w="250px"
                    border="solid"
                    borderColor="blackAlpha.300"
                    borderWidth="3px"
                    borderRadius="5px"
                    bg='whiteAlpha.800'
                    color='blackAlpha.800'
                    size="sm"
                    rightIcon={<ChevronDownIcon />}
                    fontSize={12}
                    placeholder="수강생 선택"
                    id = "select_user"
                    onChange={changeSelection}
                    mb = {5}
            >
                {data.subject.users.map((item, index)=>(
                    <option id={index} value={item._id}> {item.username}({item.email.split('@')[0]})   </option>  ) )}
            </Select>
            <VStack>
                { props.selectedUser != [] ?
                    props.selectedUser.map((item, index) => (
                        <Box  p={2}  w="100%" bgColor="blackAlpha.800" borderRadius="10px" fontWeight="700" fontSize="14px" textColor="whiteAlpha.800">
                            <HStack justifyContent="space-between">
                                <Text ml={3}>
                                {item.username}({item.email})
                                </Text>
                                <Button value={index} colorScheme="orange" bgColor="#F28F16" size="sm" onClick={handleDeleteClick}>
                                    삭제
                                </Button>
                            </HStack>
                        </Box>
                    ))
                 : <Box /> }
            </VStack>
        </Box>
        <Box>
            <CreateGroupButton
                onClose={props.onClose}
                group={props.group}
                setGroup={props.setGroup}
                selectedUser={props.selectedUser}
                setSelectedUser={props.setSelectedUser}
            />
        </Box>
    </>)
}

export default CreateGroupModal;