import {
    Box,
    Button,
    Container,
    Divider,
    Heading, HStack,
    Input,
    InputGroup,
    InputLeftAddon, InputRightElement,
    Link, Stack,
    Text, VStack
} from "@chakra-ui/react";
import {useState} from "react";



const Login = () => {

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
                        <Input focusBorderColor='#FBB738' type='search' placeholder='학번' />
                    </InputGroup>
                    <InputGroup>
                        <InputLeftAddon children='비밀번호' bgColor="#FBB738" textColor="#864600" fontWeight="800"/>
                        <Input focusBorderColor='#FBB738' type={show ? 'text' : 'password'} placeholder='비밀번호' />
                        <InputRightElement width='8rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? '비밀번호 숨기기' : '비밀번호 확인'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    <Button>
                        <Text>로그인</Text>
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default Login;