import React, { useState } from 'react';
import { Box, Button, Input, VStack, FormControl, FormLabel, Textarea, Select, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';

export default function ComplaintForm() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [problem, setProblem] = useState('');
  const [image, setImage] = useState(null);
  const [trackId, setTrackId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [submittedId, setSubmittedId] = useState(null);  // New state for showing the ID after submission
  const [isSubmitted, setIsSubmitted] = useState(false); // State to show submission success

  // Submit form data
  const submitHandler = async () => {
    const formData = new FormData();
    formData.append('message', message);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('problem', problem);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:5000/api/message', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log('Server response:', response.data);

      // Display submitted ID and success message
      setSubmittedId(response.data.id);  // Assuming server returns the ID in the response
      setIsSubmitted(true);  // Trigger success message
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Search by track ID
  const searchHandler = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/message/${trackId}`);
      setSearchResult(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Flex bg="#EEECF9" height="100vh" width={"200%"}  padding="10px"  ml={"-250px"}>  {/* Moved form to the left */}
      {/* Main container with more width */}
      <Box w="90%" maxW="1200px" p={2} boxShadow="lg" borderRadius="lg" bg="white" ml={"40px"}>
        <Flex>
          {/* Left Box: Form */}
          <Box h={"95vh"} flex="1.5" bg="white" p={4} borderRadius="md" boxShadow="md" mr={15}>
            <Heading size="md" mb={3} color="#7685D7">Submit Your Complaint</Heading>
            <VStack spacing={3}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl id="phone">
                <FormLabel>Phone Number</FormLabel>
                <Input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </FormControl>
              <FormControl id="problem">
                <FormLabel>Problem</FormLabel>
                <Select value={problem} onChange={(e) => setProblem(e.target.value)} placeholder="Select a problem">
                  <option value="Coach damage">Coach damage</option>
                  <option value="billing">Billing Problem</option>
                  <option value="cleaniness">Cleaniness</option>
                  <option value="staff behaviour">staff behaviour</option>
                  <option value="Luggage problem"> luggage problem</option>
                  <option value="electronics problem">electronics problem</option>
                  <option value="seat issue">seat issue </option>
                  <option value="Food problem">Food problem</option>
                  <option value="train delay">train delay</option>
                  <option value="others ">others</option>
                </Select>
              </FormControl>
              <FormControl id="message">
                <FormLabel>Describe the Problem</FormLabel>
                <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
              </FormControl>
              <FormControl id="image">
                <FormLabel>Upload Image</FormLabel>
                <Input type="file" onChange={(e) => setImage(e.target.files[0])} />
              </FormControl>
              <Button colorScheme="blue" w="full" onClick={submitHandler} bg="#7685D7" color="white" _hover={{ bg: '#5B6DC7' }}>
                Submit Complaint
              </Button>

              {isSubmitted && (  // Display success message after submission
                <Text color="green.500" fontSize="lg">
                  Complaint submitted successfully! Your tracking ID is: <strong>{submittedId}</strong>
                </Text>
              )}
            </VStack>
          </Box>

          {/* Right Box: Search */}
          <Box flex="1" bg="white" p={8} borderRadius="md" boxShadow="md">
            <Heading size="md" mb={4} color="#7685D7">Track Your Complaint</Heading>
            <VStack spacing={4}>
              <FormControl id="trackId">
                <FormLabel>Enter Tracking ID</FormLabel>
                <Input type="text" value={trackId} onChange={(e) => setTrackId(e.target.value)} />
              </FormControl>
              <Button colorScheme="blue" w="full" onClick={searchHandler} bg="#7685D7" color="white" _hover={{ bg: '#5B6DC7' }}>
                Search
              </Button>
              {searchResult && (
                <Box mt={5} p={4} border="1px solid #7685D7" borderRadius="md">
                  <Heading size="sm">Complaint Details:</Heading>
                  <p><strong>Name:</strong> {searchResult.name}</p>
                  {/* <p><strong>Email:</strong> {searchResult.email}</p>
                  <p><strong>Phone:</strong> {searchResult.phone}</p> */}
                  <p><strong>Problem:</strong> {searchResult.problem}</p>
                  <p><strong>Status of complaint  :</strong> {searchResult.message}</p>
                  {searchResult.image && (
                    <img src={`http://localhost:5000/${searchResult.image}`} alt="Complaint" style={{ marginTop: '10px', maxWidth: '100%' }} />
                  )}
                </Box>
              )}
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}
