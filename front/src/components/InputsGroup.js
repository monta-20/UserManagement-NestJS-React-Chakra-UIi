import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text,
  } from '@chakra-ui/react';
  import React from 'react';
  
  const InputsGroup = ({ name, onChangeHandler, value, errors }) => {
    const hasErrors = errors && errors.length > 0;
  
    return (
      <FormControl isInvalid={hasErrors} mb="4">
        <FormLabel fontSize="md" fontWeight="medium" color="gray.700">
          {name}
        </FormLabel>
        <Input
          type="text"
          name={name}
          onChange={onChangeHandler}
          value={value}
          placeholder={`Enter ${name.toLowerCase()}`}
          size="md"
          focusBorderColor="teal.500"
          variant="outline"
        />
        {hasErrors && (
          <FormErrorMessage>
            <Text color="red.500" fontSize="sm">
              {errors.join(' ')}
            </Text>
          </FormErrorMessage>
        )}
      </FormControl>
    );
  };
  
  export default InputsGroup;
  