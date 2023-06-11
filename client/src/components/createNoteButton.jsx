import {Button} from "@chakra-ui/react";
import {gql, useMutation } from "@apollo/client";

const CREATE_NOTE = gql`
mutation CreateNote($title: String!, $groupId: ID!, $content: String!, $color: String!) {
  createNote(title: $title, groupId: $groupId, content: $content, color: $color) {
    title
    owner {
      _id
    }
    group {
      _id
    }
    content
    _id
  }
}
`

const CreateNoteButton = (props) => {

    const [createNote, {loading} ] = useMutation(CREATE_NOTE, {
        variables : props.note,
        onCompleted: ( data) => {
            console.log(data)
        },
        onError(graphQLError){
            console.log(props.note)
            console.log(graphQLError);
        }
    })

    const handleNoteSubmit = () => {
        createNote()
    }

    return (
        <Button onClick={handleNoteSubmit} size="sm" m={2}>
            추가하기
        </Button>)
}

export default CreateNoteButton;