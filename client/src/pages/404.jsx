import {
 Box,
 Heading,
 Text,
 Container,
 Divider,
 Button,
 Link
} from '@chakra-ui/react'

const NotFound = () => {
 return (
     <Container p={10}>
      <Heading as="h1">Not found</Heading>
      <Text>The page you&apos;re looking for was not found.</Text>
      <Divider my={6} />
      <Box my={6} align="center">
       <Button as={Link} href="/" colorScheme="blackAlpha">
        Return to home
       </Button>
      </Box>
     </Container>
 )
}

export default NotFound
