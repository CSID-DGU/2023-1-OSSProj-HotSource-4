import {
    Box,
    Button,
    Heading,
    HStack,
    Input, Menu,
    MenuButton, MenuItemOption,
    MenuList, MenuOptionGroup,
    Spinner,
    Text,
    Textarea,
    useToast
} from "@chakra-ui/react";
import {useRef, useState} from "react";
import {gql, useMutation} from "@apollo/client";

const UPDATE_NOTE = gql`
mutation UpdateNote($id: ID!, $userId: ID!, $title: String, $content: String, $color: String) {
  updateNote(_id: $id, userId: $userId, title: $title, content: $content, color: $color) {
    _id
  }
}
`

const Memo = (props) => {

    const [ noteUsed, setNoteUsed ] = useState({})
    const [ isUpdate, setIsUpdate ] = useState(false);
    const [ Mb, setMb ] = useState("");
    const [ show, setShow ] = useState(false);


    const [ updateNote, { loading }] = useMutation(UPDATE_NOTE, {
        variables : {
            id : noteUsed._id,
            userId : props.user._id,
            title : noteUsed.title,
            content : noteUsed.content,
            color : noteUsed.color
        },
        onCompleted : data => {
            addToast("업데이트 되었습니다.", "success")
        }
    })

    function handleTitleUpdate (event) {
        setNoteUsed({...noteUsed, title : event.target.value});
    }
    function handleContentUpdate (event) {
        setNoteUsed({...noteUsed, content : event.target.value});
    }

    function handleNoteColorChange (color) {
        setNoteUsed({...noteUsed, color : color});
    }

    function handleUpdate () {
        if(!isUpdate) {
            setIsUpdate(!isUpdate)
            setNoteUsed(props.note)
        }
        else {
            updateNote();
            setIsUpdate(!isUpdate)
        }

    }





    //Toast
    const toast = useToast()
    const toastIdRef = useRef()

    function addToast(text, type) {
        toastIdRef.current = toast(
            {
                description: text,
                status: type
            })
    }

    if(loading) return <Spinner />
    if(!loading) return (
        <Box borderRadius="10px" m={5} p={2} bgColor={props.note.color} mb={Mb} >
            <HStack justify="space-between">
                <HStack>
                    {isUpdate ? <Input  w="160px" isRequired size="sm" bgColor="whiteAlpha.500" focusBorderColor='gray.600' borderRadius="8px" value={noteUsed.title} onChange={handleTitleUpdate} /> : <Heading as="h2" fontSize="16px" fontWeight="700" >{props.note.title}</Heading>}
                    <Text fontSize="12px" fontWeight="600" color="gray.600">{props.get_username(props.note.owner._id)}</Text>
                </HStack>
                {props.note.owner._id == props.user._id ?
                    <HStack spacing={0}>
                        <Button size="sm" variant="ghost" colorScheme="blackAlpha" onClick={() => {
                            handleUpdate();
                            setShow(!show);
                        } } >수정</Button>
                        { show ? <Button size="sm" variant="ghost" colorScheme="blackAlpha" onClick={() => {
                            setIsUpdate(!isUpdate)
                            setShow(!show);
                            addToast("수정이 취소되었습니다.", "warning");
                        } } >취소</Button> : <Box /> }
                        <Button size="sm" variant="ghost" colorScheme="blackAlpha" onClick={() => props.handleDeleteNote(props.note._id)} >삭제</Button>
                    </HStack>
                :
                    <Box />
                }

            </HStack>
            {isUpdate ? <Textarea
                bgColor="whiteAlpha.500"
                focusBorderColor='gray.600'
                borderRadius="12px"
                value={noteUsed.content}
                onChange={handleContentUpdate}
                mt="5px"
                whiteSpace="pre"
            /> : <Text>{props.note.content}</Text> }
            {isUpdate ?
                <Menu closeOnSelect={true} onOpen={() => setMb("350px") }  onClose={() => setMb("0px")} >
                    <HStack align="center" mt={1} spacing={0} bgColor="blackAlpha.100" borderRadius="10px" >
                    <MenuButton as={Button} size="sm" colorScheme='blackAlpha' variant="ghost" >
                        색상 선택
                    </MenuButton>
                    <Box w="14px" h="14px" borderRadius="4px" bgColor={noteUsed.color} />
                    </HStack>
                    <MenuList minWidth='120px' >
                        <MenuOptionGroup defaultValue='#F2F2F2' title='색상' type='radio'>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#F2F2F2" borderRadius="3px" />} onClick={() => handleNoteColorChange("#F2F2F2")} value='#F2F2F2'>흰색</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#FF8B94" borderRadius="3px" />} onClick={() => handleNoteColorChange('#FF8B94')} value='#FF8B94'>빨강</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#FFAAA5" borderRadius="3px" />} onClick={() => handleNoteColorChange('#FFAAA5')} value='#FFAAA5'>다홍</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#FFD3B6" borderRadius="3px" />} onClick={() => handleNoteColorChange("#FFD3B6")} value='#FFD3B6'>주황</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#DCEDC1" borderRadius="3px" />} onClick={() => handleNoteColorChange("#DCEDC1")} value='#DCEDC1'>초록</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#A8E6CF" borderRadius="3px" />} onClick={() => handleNoteColorChange("#A8E6CF")} value='#A8E6CF'>민트</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#A0D9D9" borderRadius="3px" />} onClick={() => handleNoteColorChange("#A0D9D9")} value='#A0D9D9'>파랑</MenuItemOption>
                            <MenuItemOption icon={<Box w="14px" h="14px" bgColor="#E4CEF2" borderRadius="3px" />} onClick={() => handleNoteColorChange("#E4CEF2")} value='#E4CEF2'>보라</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu> : null
            }

        </Box>
    )
}

export default Memo;