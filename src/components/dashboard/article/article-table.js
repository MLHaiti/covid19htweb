import React, {
  useEffect,
  useState,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import { Box, Flex, Button, Text } from "@chakra-ui/core";
import { useTable } from "react-table";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import useSWR from "swr";

export const ArticleTable = ({ onRowClick }) => {
  const { data, error } = useSWR("/getAllArticles", async () => {
    const a = window.localStorage.getItem("@articleList");
    return a ? JSON.parse(a) : [];
  });

  const rowClick = useCallback((row) => {
    onRowClick(row);
  }, []);
  const columns = useMemo(
    () => [
      {
        Header: "Tit",
        accessor: "title",
      },
      // {
      //   Header: "Slug",
      //   accessor: "slug",
      // },
      {
        Header: "Dat kreyasyon",
        accessor: "createdAt",
      },
      {
        Header: "Dat dènye modifikasyon",
        accessor: "updatedAt",
      },
      {
        Header: "Action",
        Cell: ({ cell: { row } }) => (
          <Button
            variantColor="blue"
            onClick={() => {
              rowClick(row);
            }}
          >
            Open
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <Styles>
      <Table columns={columns} data={data || []} />
      {data && data.length === 0 ? (
        <Flex height="48" justifyContent="center" alignItems="center">
          <Text fontSize="lg">Ou poko gen atik</Text>
        </Flex>
      ) : null}
    </Styles>
  );
};

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  });

  return (
    <Box as="table" width="full" {...getTableProps()}>
      <Box as="thead" backgroundColor="#6c7ae0" color="#ffffff">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </Box>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Box>
  );
};

const Styles = styled.div`
  text-align: left;
  border-radius: 10px;
  scroll-behavior: smooth;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 20px 0px;
  overflow: hidden;
  width: auto;
  /* max-height: 585px; */
  /* padding-top: 60px; */

  table {
    th,
    td {
      padding-top: 18px;
      padding-right: 10px;
      padding-bottom: 18px;
      :first-of-type {
        padding-left: 40px;
      }
    }
    tbody {
      tr {
        :nth-of-type(odd) {
          background-color: #f8f6ff;
        }
      }
    }
  }
`;

const testData = () => [
  {
    title: "Kisa ki koronaviris la?",
    createdAt: new Date(2020, 3, 20).toDateString(),
    updatedAt: new Date(2020, 3, 22).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Konssèy pou distans sosyal",
    createdAt: new Date(2020, 4, 19).toDateString(),
    updatedAt: new Date(2002, 4, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "First Version",
    createdAt: new Date(2020, 2, 19).toDateString(),
    updatedAt: new Date(2002, 2, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Second Version",
    createdAt: new Date(2020, 3, 19).toDateString(),
    updatedAt: new Date(2002, 3, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Third Version",
    createdAt: new Date(2020, 4, 23).toDateString(),
    updatedAt: new Date(2002, 4, 24).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Kisa ki koronaviris la?",
    createdAt: new Date(2020, 3, 20).toDateString(),
    updatedAt: new Date(2020, 3, 22).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Konssèy pou distans sosyal",
    createdAt: new Date(2020, 4, 19).toDateString(),
    updatedAt: new Date(2002, 4, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "First Version",
    createdAt: new Date(2020, 2, 19).toDateString(),
    updatedAt: new Date(2002, 2, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Second Version",
    createdAt: new Date(2020, 3, 19).toDateString(),
    updatedAt: new Date(2002, 3, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Third Version",
    createdAt: new Date(2020, 4, 23).toDateString(),
    updatedAt: new Date(2002, 4, 24).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Kisa ki koronaviris la?",
    createdAt: new Date(2020, 3, 20).toDateString(),
    updatedAt: new Date(2020, 3, 22).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Konssèy pou distans sosyal",
    createdAt: new Date(2020, 4, 19).toDateString(),
    updatedAt: new Date(2002, 4, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "First Version",
    createdAt: new Date(2020, 2, 19).toDateString(),
    updatedAt: new Date(2002, 2, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Second Version",
    createdAt: new Date(2020, 3, 19).toDateString(),
    updatedAt: new Date(2002, 3, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Third Version",
    createdAt: new Date(2020, 4, 23).toDateString(),
    updatedAt: new Date(2002, 4, 24).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Kisa ki koronaviris la?",
    createdAt: new Date(2020, 3, 20).toDateString(),
    updatedAt: new Date(2020, 3, 22).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Konssèy pou distans sosyal",
    createdAt: new Date(2020, 4, 19).toDateString(),
    updatedAt: new Date(2002, 4, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "First Version",
    createdAt: new Date(2020, 2, 19).toDateString(),
    updatedAt: new Date(2002, 2, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Second Version",
    createdAt: new Date(2020, 3, 19).toDateString(),
    updatedAt: new Date(2002, 3, 20).toDateString(),
    id: uuidv4(),
  },
  {
    title: "Third Version",
    createdAt: new Date(2020, 4, 23).toDateString(),
    updatedAt: new Date(2002, 4, 24).toDateString(),
    id: uuidv4(),
  },
];
