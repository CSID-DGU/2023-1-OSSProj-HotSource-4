import {
    HStack,
    Text,
    GridItem,
    Heading,
    VStack,
    Box,
    Button,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Flex,
    Textarea, StepIcon, Input
} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";
import {BsFillSendFill} from "react-icons/bs";


const Card = ({title, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
    <>
        <GridItem w="100%" borderColor="blackAlpha.300" borderWidth={1} shadow="dark-lg">
            <VStack spacing={2}>
                <Box w="100%" bgColor="#ECEEF1" p={3} >
                    <HStack justify="space-between">
                        <Text fontWeight="700" >[팀 활동] 제목 </Text>
                        <Box>
                            <HStack>
                                <Button onClick={onOpen} size="xs" bgColor="blackAlpha.700" textColor="whiteAlpha.800" borderRadius={0}>팀 활동 </Button>
                                <Button size="xs" bgColor="blackAlpha.700" textColor="whiteAlpha.800" borderRadius={0}>제출하기 </Button>
                            </HStack>
                        </Box>
                    </HStack>
                </Box>
                <Box w="100%" bgColor="whiteAlpha.800" >
                    <Table variant='simple' >
                        <Thead>
                            <Tr>
                                <Th bgColor="blackAlpha.700" textAlign="center">
                                    <Text fontSize="15" textColor="white">제출기한</Text>
                                </Th>
                                <Th bgColor="blackAlpha.800" textAlign="center">
                                    <Text fontSize="15" textColor="white">성적공개일자</Text>
                                </Th>
                                <Th bgColor="blackAlpha.700" textAlign="center">
                                    <Text fontSize="15" textColor="white">연장제출</Text>
                                </Th>
                                <Th bgColor="blackAlpha.800" textAlign="center">
                                    <Text fontSize="15" textColor="white">제출여부</Text>
                                </Th>
                                <Th bgColor="blackAlpha.700" textAlign="center">
                                    <Text fontSize="15" textColor="white">평가점수</Text>
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">20xx-xx-xx 00:00 ~ 20xx-xx-xx 23:59</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">20xx-xx-xx 00:00</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">허용 / 미허용</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">제출 / 미제출</Text>
                                </Td>
                                <Td bgColor="#ECEEF1" textAlign="center" p={1}>
                                    <Text fontSize="12" textColor="blackAlpha.700">xx.x</Text>
                                </Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </Box>
                <Box w="100%" bgColor="whiteAlpha.800" pl={3}>
                    <Text fontWeight="700" fontSize="14px">참고 자료 :  </Text>
                </Box>
                <Box p={2} bgColor="#ECEEF1" w="100%" borderRadius={5}>
                    <Text fontSize="14px" fontWeight="600">{ children }</Text>
                </Box>

            </VStack>
        </GridItem>
        <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='slideInBottom'
            size="full"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="40px" fontWeight="800">팀 활동 </ModalHeader>
                <ModalBody>
                    <Flex dir="row">
                        <Box flex={5} w="100%" h="500px" bgColor="blackAlpha.800">
                            <Box w="100%" bgColor="#ECEEF1" p={3} >
                                <HStack justify="space-between">
                                    <Text fontWeight="700" > 모든 메모 </Text>
                                    <Box>
                                        <HStack>
                                            <Button onClick={onOpen} size="xs" bgColor="blackAlpha.700" textColor="whiteAlpha.800" borderRadius={0}>크게 보기 </Button>
                                            <Button size="xs" bgColor="blackAlpha.700" textColor="whiteAlpha.800" borderRadius={0}>작성하기 </Button>
                                        </HStack>
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                        <Box flex={3} w="100%" h="500px" bgColor="#EEEEEE">
                            <VStack p={2}>
                                <Box w="100%" bgColor="#ECEEF1" p={3} >
                                    <HStack justify="space-between">
                                        <Text fontWeight="700" > 채팅 </Text>
                                    </HStack>
                                </Box>
                                <Box w="100%" h="380px" bgColor="whiteAlpha.700" borderRadius="30px" overflow="scroll" p={3}>
                                    CHAT AREA
                                </Box>
                                <Box w="95%" >
                                    <HStack align="space-between">
                                        <Input bgColor="whiteAlpha.700" placeholder="채팅을 입력하세요" size='md' />
                                        <Button bgColor="whiteAlpha.700">
                                        <BsFillSendFill />
                                        </Button>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Box>
                        <Box flex={1.5} w="100%" h="500px" bgColor="blackAlpha.800">
                            <Box w="100%" bgColor="#ECEEF1" p={3} >
                                <HStack justify="space-between">
                                    <Text fontWeight="700" > 팀원 </Text>
                                </HStack>
                            </Box>
                        </Box>
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='orange' mr={3} fontWeight="800"  onClick={onClose}>
                        닫기
                    </Button>
                    <Button colorScheme='orange' mr={3} fontWeight="800" onClick={onClose}>
                        제출하기
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </>
    )
}

export default Card;