import {Button, useToast} from "@chakra-ui/react";
import {gql, useMutation } from "@apollo/client";
import {useRef} from "react";


const CREATE_NOTE = gql`
mutation CreateNote($title: String!, $content: String!, $color: String!, $groupId: ID!, $userId: ID!) {
  createNote(title: $title, content: $content, color: $color, groupId: $groupId, userId: $userId) {
    title
    owner {
      _id
    }
    content
    color
    _id
  }
}
`

const CreateNoteButton = (props) => {

    const [createNote, {loading} ] = useMutation(CREATE_NOTE, {
        variables : props.note,
        onCompleted: ( data) => {
            console.log(data)
            addToast("메모가 생성되었습니다", "success")
            props.setNote({
                title : "",
                content : "",
                groupId : props.group._id,
                userId : props.user._id,
                color : "",
            })
        },
        onError(graphQLErrors){
            console.log(graphQLErrors.message);
            if(graphQLErrors.message.includes("Title is required")) addToast("제목을 입력해주세요", "error")
            if(graphQLErrors.message.includes(" Path `content` is required.")) addToast("내용을 입력해주세요", "error")
            if(graphQLErrors.message.includes("color: Path `color` is required.")) addToast("색상을 선택해주세요", "error")
        }
    })

    const handleNoteSubmit = () => {
        createNote()
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


    return (
        <Button onClick={handleNoteSubmit} size="sm" color={props.get_colorTheme(props.note.color)} fontSize="14px" fontWeight="900" colorScheme='blackAlpha' variant="ghost"  >
            추가하기
        </Button>)
}

export default CreateNoteButton;