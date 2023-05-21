import { Box } from '@chakra-ui/react'

const Footer = () => {
    return (
        <Box align="left" maxW="100%" h="100px" p={10} fontSize="12px" bgColor="#E3E4E9" textColor="#999999">
            서울캠퍼스 : (04620) 서울특별시 중구 필동로 1길 30 (필동3가 26) Tel.02-2260-3114 Fax.02-2277-1274 <br />
            경주캠퍼스 : (38066) 경상북도 경주시 동대로 123 동국대학교 경주캠퍼스, Tel.054-770-2114, Fax.054-770-2001 <br />
            {/*COPYRIGHT &copy; {new Date().getFullYear()} DONGGUK UNIVERSITY SINCE 1906. ALL RIGHTS RESERVED.*/}
        </Box>
    )
}

export default Footer
