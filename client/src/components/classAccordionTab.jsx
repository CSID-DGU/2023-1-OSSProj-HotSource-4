import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Divider,
    Link
} from "@chakra-ui/react";
import {EditIcon} from "@chakra-ui/icons";

const ClassAccordionTab = (props) => {
    const setContents = (n, m) => {
        props.setContets(n, m)
    }

    return (
        <Accordion minW="200px"
                   h="850px"
                   color="whiteAlpha.700"
                   bgColor="blackAlpha.800"
                   borderColor="blackAlpha.300"
                   allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }} >
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            학습 목차
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600"  >
                    <Link onClick={() => setContents(0,0)} display="block"> 학습 목차 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(0,1)} display="block"> 강의 목록 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(0,2)} display="block"> 학습자료실 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            학습 정보
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 공지사항 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 질의응답 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            학습 활동 관리
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 수강생 조회 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            학습 활동
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(2,0)} display="block"> 출석 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(2,1)} display="block"> 과제 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(2,2)} display="block"> 토론 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(2,3)} display="block"> 시험 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link onClick={() => setContents(2,4)} display="block"> 설문 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block" onClick={() => setContents(2,5)}> 팀활동 </Link>
                </AccordionPanel>
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            학습 현황
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 학습 현황 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            과목 정보
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 강의 계획서 </Link>
                </AccordionPanel>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 과목 정보 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
            <AccordionItem>
                <h2>
                    <AccordionButton _expanded={{ bg: '#F28F16', color: 'white' }}>
                        <Box
                            as="span"
                            flex='1'
                            textAlign='left'
                            fontWeight="700"
                            fontSize="15px"
                        >
                            <EditIcon mr={2} />
                            성적
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <Divider />
                <AccordionPanel py={2} fontSize="14px" fontWeight="600">
                    <Link display="block"> 성적 보기 </Link>
                </AccordionPanel>
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
                <Divider />
            </AccordionItem>
        </Accordion>
    )
}


export default ClassAccordionTab;