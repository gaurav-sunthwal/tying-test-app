import {
  Box,
  Button,
  HStack,
  Heading,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  const [text, setText] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const limit = 1;
      const apiKey = "wwGxxEUa2boYfOZKkYzS7g==F7P5KFRIfVXdczZ1";

      try {
        const response = await axios.get(
          "https://api.api-ninjas.com/v1/jokes",
          {
            params: { limit },
            headers: { "X-Api-Key": apiKey },
          }
        );

        setText(response.data.map(jokeObject => jokeObject.joke));
        // Process the response data as needed
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);
  const [inputValue, setInputValue] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  function handleOnChange(e) {
    setInputValue(e.target.value);
    const typedChar = e.target.value.slice(-1);
    const currentChar = text[currentIndex];

    if (typedChar === currentChar) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
       console.log("correct");
    } else {
      console.log("!correct");
    }
  }

  return (
    <div>
      <Box>
        <VStack w={"100%"}>
          <Heading>Check Your Typing Speed</Heading>

          <Box w={"100%"}>
            <HStack justifyContent={"space-around"} w={"full"}>
              <Heading>
                Timing <span>60</span>
              </Heading>
              <Heading>
                <span>20</span> WPS
              </Heading>
            </HStack>
          </Box>

          <Box textAlign={"center"} w={"50%"} m={6}>
            <Heading as="h4" size="md">
              {text}
            </Heading>
          </Box>
          <Button colorScheme="purple">Start</Button>

          <Textarea
            w={"50%"}
            autoFocus
            placeholder="Type.."
            value={inputValue}
            onChange={handleOnChange}
          ></Textarea>
        </VStack>
      </Box>
    </div>
  );
}

export default Home;
