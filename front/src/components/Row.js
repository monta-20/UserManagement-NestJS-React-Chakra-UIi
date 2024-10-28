import { Avatar, Box, Button, Td, Tr, IconButton, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GlobalContext } from '../context/GlobalWrapper';

const Row = ({ id, fullname, email, age, country }) => {
  const { Delete, onOpen, FindOne } = useContext(GlobalContext);

  const handleEdit = () => {
    onOpen();
    FindOne(id);
  };

  return (
    <Tr>
      <Td>
        <Avatar name={fullname} size="sm" />
      </Td>
      <Td>
        <Text fontWeight="medium" color="gray.700">
          {fullname}
        </Text>
      </Td>
      <Td>
        <Text color="gray.600">{email}</Text>
      </Td>
      <Td>
        <Text color="gray.600">{age}</Text>
      </Td>
      <Td>
        <Text color="gray.600">{country}</Text>
      </Td>
      <Td>
        <Box display="flex" gap="2">
          <IconButton
            aria-label="Edit user"
            icon={<AiFillEdit />}
            colorScheme="blue"
            onClick={handleEdit}
            size="sm"
            variant="outline"
          />
          <IconButton
            aria-label="Delete user"
            icon={<AiFillDelete />}
            colorScheme="red"
            onClick={() => Delete(id)}
            size="sm"
            variant="outline"
          />
        </Box>
      </Td>
    </Tr>
  );
};

export default Row;
