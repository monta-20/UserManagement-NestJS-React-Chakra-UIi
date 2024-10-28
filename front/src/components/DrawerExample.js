import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Stack,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useContext, useEffect, useState } from 'react';
  import { GlobalContext } from '../context/GlobalWrapper';
  import InputsGroup from './InputsGroup';
  
  export default function DrawerExample() {
    const { onOpen, isOpen, onClose, Add, errors, setErrors, user, Update } = useContext(GlobalContext);
    const [form, setForm] = useState({});
    
    const onChangeHandler = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const onAdd = () => Add(form, setForm);
    const onUpdate = () => Update(form, setForm, form._id);
  
    useEffect(() => {
      setForm(user);
    }, [user]);
  
    const resetForm = () => {
      setErrors({});
      setForm({});
    };
  
    const drawerBg = useColorModeValue("white", "gray.800");
    const headerColor = useColorModeValue("teal.500", "teal.200");
  
    return (
      <>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
          <DrawerOverlay />
          <DrawerContent bg={drawerBg} boxShadow="lg">
            <DrawerCloseButton onClick={() => { onClose(); resetForm(); }} />
            <DrawerHeader fontSize="2xl" color={headerColor} fontWeight="bold">
              {form._id ? "Update User" : "Create User"}
            </DrawerHeader>
  
            <DrawerBody>
              <Stack spacing="6">
                {["fullname", "email", "age", "country"].map((field) => (
                  <InputsGroup
                    key={field}
                    name={field}
                    onChangeHandler={onChangeHandler}
                    value={form[field] || ""}
                    errors={errors?.[field]}
                  />
                ))}
              </Stack>
            </DrawerBody>
  
            <DrawerFooter borderTopWidth="1px">
              <Button
                variant="outline"
                mr="3"
                onClick={() => { onClose(); resetForm(); }}
                colorScheme="gray"
              >
                Cancel
              </Button>
              <Button
                colorScheme="teal"
                onClick={() => (form._id ? onUpdate() : onAdd())}
              >
                {form._id ? "Update" : "Save"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    );
  }
  