import { Box, Button, CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import axiosInstance from "../../config/axiosInstance";
import dayjs from "dayjs";
import "dayjs/locale/tr";

export default function Category() {
  const [deleteId, setDeleteId] = useState<number>();

  const { data, isLoading, error, refetch } = useQuery("orders", () => {
    return axiosInstance.get("orders").then((res) => res.data);
  });

  const deleteOrderMutation = useMutation(
    (orderId) => axiosInstance.delete(`orders/${orderId}`),
    {
      onSuccess: () => {
        // Mutasyon başarılı olduğunda sorguyu yeniden çağırarak verileri güncelleyecek
        refetch();
      },
      onError: (error) => {
        // Hata oluştuğunda
        console.error("Delete mutation error:", error);
      },
    }
  );

  const handleDeleteOrder = (id: any) => {
    setDeleteId(id);
    deleteOrderMutation.mutate(id);
  };

  const DeleteButton = ({ id }: any) => {
    if (deleteId === id) {
      return (
        <Button
          variant="contained"
          color="error"
          disabled={deleteOrderMutation.isLoading}
          onClick={() => handleDeleteOrder(id)}
        >
          {deleteOrderMutation.isLoading ? (
            <CircularProgress size={24} />
          ) : (
            "Delete"
          )}
        </Button>
      );
    } else {
     return <Button
        variant="contained"
        color="error"
        disabled={deleteOrderMutation.isLoading}
        onClick={() => handleDeleteOrder(id)}
      >
        Delete
      </Button>;
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "customerId",
      headerName: "Customer Id",
      width: 100,
      type: "number",
      editable: true,
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <span>
            {dayjs(params.row.orderDate, { locale: "tr" }).format(
              "DD MMMM YYYY"
            )}
          </span>
        );
      },
    },
    {
      field: "shippedDate",
      headerName: "Shipped Date",
      width: 200,
      editable: true,
      renderCell: (params) => {
        return (
          <span>
            {dayjs(params.row.orderDate, { locale: "tr" }).format(
              "DD MMMM YYYY"
            )}
          </span>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 200,
      renderCell: (params) => {
        return <DeleteButton id={params.row.id} />;
      },
    },
  ];

  return (
    <div style={{marginTop:'20px'}}>
      <Box sx={{ height: 800, width: "100%" }}>
        {data && (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </div>
  );
}
