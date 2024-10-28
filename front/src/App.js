import {
  Box,
  Button,
  Container,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalWrapper';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import Row from './components/Row';
import DrawerExample from './components/DrawerExample';

function App() {
  const { FetchUsers, Search, users, onOpen, isOpen, onClose } =
    useContext(GlobalContext);
  const [query, setQuery] = useState('');

  useEffect(() => {
    FetchUsers();
  }, []);

  const SearchHandler = () => {
    Search(query);
  };

  const onchangeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <Container maxW={'full'} p="6" fontSize={'16px'}>
        <Box rounded="lg" boxShadow="lg" p="6" bg="gray.50">
          <HStack spacing="4" mb="4" align="center">
            <FormControl>
              <Input
                placeholder="Search by name or email..."
                type="text"
                onChange={onchangeHandler}
                bg="white"
              />
            </FormControl>
            <Button
              leftIcon={<AiOutlineSearch />}
              colorScheme="teal"
              variant="solid"
              onClick={SearchHandler}
            >
              Search
            </Button>
          </HStack>
          <Heading size="lg" fontWeight="bold" textAlign="center" mt="4" mb="6">
            User Management
          </Heading>
        </Box>
        <Box mt="5" rounded={'lg'} boxShadow="lg" bg="white">
          <Box p="4" display={'flex'} justifyContent="space-between" alignItems="center">
            <Text fontSize="2xl" fontWeight="semibold" color="teal.600">
              User List
            </Text>
            <Button
              colorScheme="teal"
              variant="solid"
              leftIcon={<AiOutlinePlus />}
              onClick={onOpen}
            >
              Add User
            </Button>
          </Box>
          <TableContainer p="4">
            <Table variant="striped" colorScheme="teal">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Full Name</Th>
                  <Th>Email</Th>
                  <Th>Age</Th>
                  <Th>Country</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {users?.map(({ _id, fullname, email, age, country }) => (
                  <Row
                    key={_id}
                    id={_id}
                    fullname={fullname}
                    email={email}
                    age={age}
                    country={country}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <DrawerExample isOpen={isOpen} onClose={onClose} />
      </Container>
    </div>
  );
}

export default App;
