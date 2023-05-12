import {
    Box,
    Button,
    Container,
    Divider,
    HStack,
    Menu,
    MenuButton, MenuItem,
    MenuList,
    StackDivider,
    Text
} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon, EmailIcon, InfoIcon} from "@chakra-ui/icons";
import {useState} from "react";

const ClassTitleBox = () => {
    const [hidden, setHidden] = useState(false);

    const handleTopBox = () => {
        setHidden(!hidden);
    }

    const basicBoxStyles = {
        background:
            'url(/pxfuel.jpg) center/cover no-repeat'
    }
    return (
        <>
            <Container
                display={hidden ? "flex" : "none" }
                maxW="80%"
                h="65px"
            />
            <Container
                display={ hidden ? "none" : "flex" }
                p={0}
                maxW="80%"
                wrap="wrap"
                justify="center"
                align="center"
            >
                <Box
                    sx={basicBoxStyles}
                    w="inherit"
                    h="270px"
                    mx="auto"
                    objectFit='cover'
                >
                    <Text //과목명 Text
                        mt="90px"
                        fontSize={45}
                        fontWeight="extrabold"
                        color="white"
                    >
                        오픈소스소프트웨어프로젝트_01
                    </Text>
                    <Container //과목 상세 정보 Box
                        bg="whiteAlpha.700"
                        maxW="80%"
                        p="10px"
                        flexWrap="wrap"
                        borderRadius={10}
                        p={2}
                    >
                        <HStack
                            justifyContent="space-between"

                        >
                            <Box
                                bg="blackAlpha.700"
                                w="250px"
                                h="60px"
                                borderRadius={5}
                                align="center"
                            >
                                <HStack
                                    divider={<StackDivider />}
                                    color="white"
                                    justify="space-evenly"
                                    p={1}
                                    fontSize={12}
                                >
                                    <Text>
                                        이수구분
                                    </Text>
                                    <Text>
                                        학점
                                    </Text>
                                    <Text>
                                        공동교수정보
                                    </Text>
                                </HStack>
                                <Divider />
                                <HStack
                                    divider={<StackDivider />}
                                    color="white"
                                    justify="space-evenly"
                                    p={1}
                                    fontSize={12}
                                >
                                    <Text>
                                        전공
                                    </Text>
                                    <Text>
                                        3.0학점
                                    </Text>
                                    <Button size="xs" align="center" bgColor="blackAlpha.700">
                                        조회하기
                                    </Button>
                                </HStack>
                            </Box>
                            <Box
                                bg="whiteAlpha.700"
                                w="350px"
                                h="60px"
                                borderRadius={5}
                            >
                                <HStack
                                    divider={<StackDivider borderColor="blackAlpha.700"/>}
                                    color="blackAlpha.700"
                                    justify="space-evenly"
                                    p={1}
                                    fontSize={12}
                                >
                                    <Text>
                                        대표교수
                                    </Text>
                                    <Text>
                                        <EmailIcon mr={2}/>
                                        이메일
                                    </Text>
                                </HStack>
                                <Divider borderColor="blackAlpha.700"/>
                                <HStack
                                    divider={<StackDivider borderColor="blackAlpha.700"/>}
                                    color="blackAlpha.700"
                                    justify="space-evenly"
                                    p={1}
                                    fontSize={12}
                                >
                                    <Text ml={7}>
                                        김동호
                                    </Text>
                                    <Text>
                                        dongho.kim@dgu.edu
                                    </Text>
                                </HStack>
                            </Box>
                        </HStack>
                    </Container>
                </Box>

            </Container>



            <Container
                bgGradient='linear(to-t, #A0A0A0 0%, #F0F0F0 100%)'
                maxW="80%"
                h="50px"
            >
                <HStack
                    justify="space-between"
                    pt={3}
                >
                    <Menu>
                        <MenuButton
                            as={Button}
                            maxH="25px"
                            border="solid"
                            borderColor="blackAlpha.300"
                            borderWidth="1px"
                            borderRadius="5px"
                            rightIcon={<ChevronDownIcon />}
                            fontSize={12}
                            p={2}
                        >
                            오픈소스소프트웨어 프로젝트
                        </MenuButton>
                        <MenuList >
                            <MenuItem fontSize={12}> 오픈소스 소프트웨어 프로젝트 </MenuItem>
                            <MenuItem fontSize={12}> 컴퓨터 네트워크 및 보안 </MenuItem>
                            <MenuItem fontSize={12}> 융합 프로그래밍 1</MenuItem>
                            <MenuItem fontSize={12}> 융합 프로그래밍 2</MenuItem>
                            <MenuItem fontSize={12}> 자료구조 및 알고리즘 1</MenuItem>
                        </MenuList>
                    </Menu>
                    <Button onClick={handleTopBox} size="xl" w="30px">
                        {hidden ? <ChevronDownIcon /> : <ChevronUpIcon />  }
                    </Button>
                    <Button
                        fontSize={13}
                        p={1}
                        border="solid"
                        borderColor="blackAlpha.300"
                        borderWidth="1px"
                        bgColor="whiteAlpha.800"
                        size="xl"
                    >
                        <InfoIcon mr={1} />
                        강의계획서
                    </Button>
                </HStack>

            </Container>
        </>
    )
}


export default ClassTitleBox;