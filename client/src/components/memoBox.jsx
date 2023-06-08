import {Box, Button, Container, HStack, Input, Spinner, Text, Textarea} from "@chakra-ui/react";
import CreateNoteButton from "./createNoteButton";
import {useState} from "react";
import {gql, useQuery} from "@apollo/client";

const QUERY_MEMO = gql`
query Notes($groupId: ID!) {
  notes(groupId: $groupId) {
    content
    title
    owner {
      _id
      username
    }
    _id
  }
}
`

const MemoBox = (props) => {

    const { data, loading } = useQuery(QUERY_MEMO,{
        variables : {
            groupId : props.user._id
        },
        onError(graphQLError) {
            console.log(graphQLError);
        }
    })

    console.log(props.user._id)
    console.log(data);

    const [note, setNote ] = useState({
        title : "",
        content : "",
        groupId : props.group._id,
        owner : props.user._id
    })
    const handleNoteTitleChange = (event) => {
        setNote({...note, title: event.target.value})
        console.log(note)
    }

    const handleNoteContentChange = (event) => {
        setNote({...note, content: event.target.value})
        console.log(note)
    }

    if (loading) return <Spinner />
    if (!loading) return (
        <>
            <Box flex={3} w="100%" h="500px" bgColor="whiteAlpha.800">
            <Box w="100%" bgColor="#ECEEF1" p={3} >
                <HStack justify="space-between">
                    <Text fontWeight="700" > 메모 작성 </Text>
                </HStack>
            </Box>
            <Container>
                <Text fontWeight="700" mt={2}> 메모 이름 </Text>
                <Input
                    isRequired
                    focusBorderColor='#F28F16'
                    placeholder='제목을 입력해주세요'
                    value={note.title}
                    onChange={handleNoteTitleChange}
                    my={3}
                />
                <Text fontWeight="700" > 메모 내용 </Text>
                <Textarea
                    placeholder='내용을 작성해주세요'
                    focusBorderColor='#F28F16'
                    value={note.content}
                    onChange={handleNoteContentChange}
                    h="280px"
                    mb="5px"
                />
                <Box bgColor='blackAlpha.800' borderRadius="5px">
                    <HStack justifyContent="end">
                        <CreateNoteButton user={props.user} group={props.group} title={props.title} note={note} />
                    </HStack>
                </Box>
            </Container>
            </Box>
            <Box flex={5} w="100%" h="500px" bgColor="blackAlpha.800">
                <Box w="100%" bgColor="#ECEEF1" p={3} >
                    <HStack justify="space-between">
                        <Text fontWeight="700" > 모든 메모 </Text>
                        <Box>
                            <HStack>
                                <Button  size="xs" bgColor="blackAlpha.700" textColor="whiteAlpha.800" borderRadius={0}>크게 보기 </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
            </Box>
        </>
    )
}


export default MemoBox;