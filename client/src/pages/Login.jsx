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
import {useState, useRef} from "react";
import {useQuery, useMutation, gql } from "@apollo/client";


const Login = (props) => {

    const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password:  $password) {
            token
            user {
            _id
            username
            }
        }
    }
    `

    const [username, setUsername] = useState("");
    const [password, setPassword ] = useState("");
    const [login, {data, loading, error }] = useMutation(LOGIN);

    const handleSubmit = async () => {
        try {
            console.log(username, password);
            await login({variables : {username, password}})

        } catch (e) {
            console.error("Error creating user: ", e)
            addToast()
        }

        await localStorage.setItem("user", JSON.stringify(data));
        await console.log(data);
        await props.setToken(data.login.token);
        await props.setUser(data.login.user);
        await props.setIsLogin(!props.isLogin);
    }

    const toast = useToast()
    const toastIdRef = useRef()

    function addToast() {
       toastIdRef.current = toast(
           {
               description: '학번 또는 비밀번호가 일치하지 않습니다',
               status: 'error'
           })
    }

    const basicBoxStyles = {
        background:
            'url(/dgu_logo.png) center/cover no-repeat'
    }
    const [show, setShow] = useState(false)
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
                        <Input onChange={(e) => setUsername(e.target.value)} focusBorderColor='#FBB738' type='search' placeholder='학번' />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon children='비밀번호' bgColor="#FBB738" textColor="#864600" fontWeight="800"/>
                        <Input onChange={(e) => setPassword(e.target.value)} focusBorderColor='#FBB738' type={show ? 'text' : 'password'} placeholder='비밀번호' />
                        <InputRightElement width='8rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? '비밀번호 숨기기' : '비밀번호 확인'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button onClick={handleSubmit}>
                        <Text>로그인</Text>
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default Login;