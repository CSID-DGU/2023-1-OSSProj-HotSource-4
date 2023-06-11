import {
    Box,
    Button,
    Container, Flex,
    HStack,
    Input, Menu,
    MenuButton,
    MenuItemOption,
    MenuList, MenuOptionGroup,
    Spinner,
    Text,
    Textarea,
} from "@chakra-ui/react";
import CreateNoteButton from "./createNoteButton";
import {useState} from "react";
import {gql, useQuery} from "@apollo/client";

import Memos from "./memos";

const QUERY_MEMO = gql`
query Notes($groupId: ID!) {
  notes(groupId: $groupId) {
    content
    title
    owner {
      _id
    }
    _id
    color
  }
}
`

const MemoBox = (props) => {

    const { data, loading } = useQuery(QUERY_MEMO,{
        variables : {
            groupId : props.group._id
        },
        pollInterval : 100,
        onError(graphQLError) {
            console.log(graphQLError);
        }
    })

    const [note, setNote ] = useState({
        title : "",
        content : "",
        groupId : props.group._id,
        userId : props.user._id,
        color : "#F2F2F2",
    })
    const handleNoteTitleChange = (event) => {
        setNote({...note, title: event.target.value})
        console.log(note)
    }

    const handleNoteContentChange = (event) => {
        setNote({...note, content: event.target.value})
        console.log(note)
    }

    const handleNoteColorChange = (Color) => {
        setNote({...note, color : Color});
    }

    function get_colorTheme (s) {

        let r = s[1] + s[2];
        let g = s[3] + s[4];
        let b = s[5] + s[6];

        r = parseInt(r, 16) - 128;
        g = parseInt(g, 16) - 128;
        b = parseInt(b, 16) - 128;

        r = r.toString(16).toUpperCase();
        g = g.toString(16).toUpperCase();
        b = b.toString(16).toUpperCase();

        return s[0] + r + g + b;
    }


    if (loading) return <Spinner />
    if (!loading) return (
        <Box flex={10} mr={10} >
            <Flex >
            <Box flex={5} w="100%" h="500px" bgColor="blackAlpha.800" borderRadius="15px" >
                <Box w="100%" bgColor="#ECEEF1" p={3} >
                    <HStack justify="space-between">
                        <Text fontWeight="700" > 모든 메모 </Text>

                    </HStack>
                </Box>
                <Memos notes={data.notes} user={props.user} />
            </Box>
            <Box flex={3} w="100%" h="500px" bgColor={note.color} borderRadius="15px" >
            <Box w="100%" bgColor="#ECEEF1" p={3} >
                <HStack justify="space-between">
                    <Text fontWeight="700" > 메모 작성 </Text>
                </HStack>
            </Box>
            <Container >
                <Text fontWeight="700" mt={2} color={get_colorTheme(note.color)} > 메모 이름 </Text>
                <Input
                    isRequired
                    focusBorderColor={get_colorTheme(note.color)}
                    borderWidth={0}
                    placeholder='제목을 입력해주세요'
                    bgColor="whiteAlpha.300"
                    value={note.title}
                    onChange={handleNoteTitleChange}
                    my={3}
                />
                <Text fontWeight="700" color={get_colorTheme(note.color)} > 메모 내용 </Text>
                <Textarea
                    placeholder='내용을 작성해주세요'
                    bgColor="whiteAlpha.300"
                    borderWidth={0}
                    focusBorderColor={get_colorTheme(note.color)}
                    value={note.content}
                    onChange={handleNoteContentChange}
                    h="280px"
                    mb="5px"
                    whiteSpace="pre"
                />
                <Box bgColor="whiteAlpha.300" borderRadius="5px">
                    <HStack justifyContent="space-between">
                        <Menu closeOnSelect={true} >
                            <MenuButton as={Button} size="sm" color={get_colorTheme(note.color)} colorScheme='blackAlpha' variant="ghost" >
                                색상 선택
                            </MenuButton>
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
                        </Menu>
                        <CreateNoteButton get_colorTheme={get_colorTheme} user={props.user} group={props.group} title={props.title} note={note} setNote={setNote} />
                    </HStack>
                </Box>
            </Container>
            </Box>
            </Flex>

        </Box >
    )
}


export default MemoBox;