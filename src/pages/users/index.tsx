import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  useBreakpointValue,
  Stack,
  Skeleton,
  Spinner,
} from "@chakra-ui/react";

import { Header } from "../../components/Header";
import { SideBar } from "../../components/SideBar";
import { Pagination } from "../../components/Pagination";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import Link from "next/link";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px={["2", "4", "6"]}>
        <SideBar />

        <Box flex="1" borderRadius="8" bg="gray.800" p={["4", "6", "8"]}>
          <Flex mb="8" justify="space-between" align="center">
            <Heading as="h2" size="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Link href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              >
                Criar novo
              </Button>
            </Link>
          </Flex>

          {isLoading ? (
            <Stack justify="center">
              <Skeleton
                startColor="gray.800"
                endColor="gray.700"
                height="60px"
              />
              <Skeleton
                startColor="gray.800"
                endColor="gray.700"
                height="60px"
              />
              <Skeleton
                startColor="gray.800"
                endColor="gray.700"
                height="60px"
              />
              <Skeleton
                startColor="gray.800"
                endColor="gray.700"
                height="60px"
              />
            </Stack>
          ) : error ? (
            <Flex>
              <Text>Fail to get users</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" width="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.name}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <Text fontWeight="bold">{user.name}</Text>
                          <Text fontSize="sm" color="gray.300">
                            {user.email}
                          </Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}

                      {isWideVersion && (
                        <Td>
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="purple"
                            leftIcon={<Icon as={RiPencilLine} />}
                          >
                            Editar
                          </Button>
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onChangePage={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
