import {
    Box,
    Button,
    Container,
    Divider,
    Heading, HStack,
    Input,
    InputGroup,
    InputLeftAddon, InputRightElement,
    Link, localStorageManager, Stack,
    Text, useToast, VStack
} from "@chakra-ui/react";
import {useState, useRef, useContext} from "react";
import {useMutation, gql } from "@apollo/client";
import {AuthContext} from "../context/authContext";
import {useForm} from "../utility/useForm";

const LOGIN_USER = gql`
  mutation Login($loginId: String!, $password: String!) {
    login(id: $loginId, password: $password) {
        token
        user {
          _id
          isAdmin
          username
          subjects {
            _id
          }
        }
    }
  }
`

const Login = (props) => {

    const context = useContext(AuthContext);
    const [ errors, setErrors ] = useState([]);

    const loginUserCallback = async () => {
        await login();
    }

    const { onIdChange, onPwChange, onSubmit, values } = useForm(loginUserCallback, {
        loginId: '',
        password: ''
    });

    const [login, {loading}] = useMutation(LOGIN_USER, {
        variables:  values ,
        update(proxy, {data: {login: userData }}) {
            context.login(userData);
            addSuccessToast(userData.user.username);
            setInterval( () => {
                window.location.replace("/class/");
            }, 1000);
        },
        onError({graphQLErrors}){
            setErrors(graphQLErrors);
            addErrorToast();
        }
    });

    //CSS
    const toast = useToast()
    const toastIdRef = useRef()
    const [show, setShow] = useState(false)

    function addErrorToast() {
       toastIdRef.current = toast(
           {
               description: '학번 또는 비밀번호가 일치하지 않습니다',
               status: 'error'
           })
    }

    function addSuccessToast(username) {
        toastIdRef.current = toast(
            {
                description: `${username}님 반갑습니다!`,
                status: 'success'
            })
    }

    const basicBoxStyles = {
        background:
            'url(/dgu_logo.png) center/cover no-repeat'
    }

    const handleClick = () => setShow(!show)

    return (
        <Container p={10}>
            <HStack spacing={5} mt={100}>
                <Box sx={basicBoxStyles} w="65px" h="65px"/>
                <VStack align="left">
                    <Heading as="h1" >Dongguk University</Heading>
                    <Text fontWeight="600">동국대학교 이클래스</Text>
                </VStack>
            </HStack>

            <Divider my={6} />
            <Box my={6} align="center" >
                <Stack spacing={4}>
                    <InputGroup>
                        <InputLeftAddon children='학번' bgColor="#FBB738" textColor="#864600" fontWeight="800"/>
                        <Input onChange={onIdChange} focusBorderColor='#FBB738' type='search' placeholder='학번' />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon children='비밀번호' bgColor="#FBB738" textColor="#864600" fontWeight="800"/>
                        <Input onChange={onPwChange} focusBorderColor='#FBB738' type={show ? 'text' : 'password'} placeholder='비밀번호' />
                        <InputRightElement width='8rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? '비밀번호 숨기기' : '비밀번호 확인'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button onClick={onSubmit}>
                        <Text>로그인</Text>
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default Login;