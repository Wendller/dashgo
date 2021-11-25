import { Stack, Box, Text } from "@chakra-ui/react";
import PaginationItem from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onChangePage: (page: number) => void;
}

const siblingsPageCount = 1;

function generateInnnerPagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1;
    })
    .filter((page) => page > 0);
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onChangePage,
}: PaginationProps) {
  const lastPage = Math.floor(totalCountOfRegisters / registersPerPage);

  const previousPages =
    currentPage > 1
      ? generateInnnerPagesArray(
          currentPage - 1 - siblingsPageCount,
          currentPage - 1
        )
      : [];

  const nextPages =
    currentPage < lastPage
      ? generateInnnerPagesArray(
          currentPage,
          Math.min(currentPage + siblingsPageCount, lastPage)
        )
      : [];

  return (
    <Stack
      direction={["column", "row"]}
      spacing={["4", "4", "8"]}
      mt="8"
      justify="space-between"
      align="center"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>

      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsPageCount && (
          <>
            <PaginationItem onPageChange={onChangePage} number={1} />
            {currentPage > 2 + siblingsPageCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPages.length > 0 &&
          previousPages.map((page) => (
            <PaginationItem
              onPageChange={onChangePage}
              key={page}
              number={page}
            />
          ))}

        <PaginationItem
          onPageChange={onChangePage}
          number={currentPage}
          isCurrent
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItem
              onPageChange={onChangePage}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingsPageCount < lastPage && (
          <>
            {currentPage + 1 + siblingsPageCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItem onPageChange={onChangePage} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}
