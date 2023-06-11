import Layout from "../Layout/showUpLayout";
import HoverEffect from "../Layout/hoverEffect";
import {Box, Button, Heading, HStack, Input, Spinner, Text, Textarea, useToast, VStack} from "@chakra-ui/react";
import {gql, useMutation, useQuery} from "@apollo/client";
import {useRef, useState} from "react";
import Memo from "./memo";

const USER = gql`
query Users {
  users {
    _id
    username
  }
}
`

const DELETE_NOTE = gql`
mutation DeleteNote($id: ID!, $userId: ID!) {
  deleteNote(_id: $id, userId: $userId) {
    _id
  }
}
`

const Memos = (props) => {


    const {data, loading } = useQuery(USER,{
        onError(graphQLError){
            console.log(graphQLError)
        }})

    const [deleteNote, {} ] = useMutation(DELETE_NOTE, {
        onCompleted: data => {
            addSuccessToast0()
        },
        onError(graphQLError){
            console.log(graphQLError)
        }
    })

    const get_username = (item) => {
        for(let i = 0; i < data.users.length; i++){
            if (data.users[i]._id === item) return data.users[i].username;
        }
    }

    function handleDeleteNote (id) {
        deleteNote({
            variables : {
                id : id,
                userId : props.user._id
            }
        })
    }



    //Toast
    const toast = useToast()
    const toastIdRef = useRef()

    function addSuccessToast0() {
        toastIdRef.current = toast(
            {
                description: "메모가 삭제되었습니다",
                status: 'success'
            })
    }


    if (loading) return <Spinner />
    if (!loading) return (
        <Box
            w="100%"
            h="440px"
            overflow="scroll"
        >
            {props.notes.map((item, index) => (
                <Layout>
                    <HoverEffect>
                        <Memo note={item} user={props.user} handleDeleteNote={handleDeleteNote} get_username={get_username} />
                    </HoverEffect>
                </Layout>
            ))}
        </Box>
    )
}

export default Memos;