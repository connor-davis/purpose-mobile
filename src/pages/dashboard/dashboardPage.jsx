import { Box, HStack, VStack } from '@hope-ui/solid';

import useState from '../../hooks/state';

let DashboardPage = () => {
  let [userState, updateUserState] = useState('userState');

  return (
    <VStack w="$full" h="$full" color="black" bg="white">
      <HStack w="$full" class="justify-between">
        <Box>Your Dashboard</Box>
      </HStack>
      <Box w="$full" h="$full" pb="$20" overflowY="auto">
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
        <Box w="$full" p="$10" mb="$5" bg="$lime400">
          Hello
        </Box>
      </Box>
    </VStack>
  );
};

export default DashboardPage;
