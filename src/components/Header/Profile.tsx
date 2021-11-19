import { Flex, Box, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export default function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Wendller Tenorio</Text>
          <Text color="gray.300" fontSize="small">
            wendlerdeveloper@gmail.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Wendler Tenorio"
        src="https://github.com/Wendller.png"
      />
    </Flex>
  );
}
