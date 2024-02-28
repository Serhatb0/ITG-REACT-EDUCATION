import { Button, CircularProgress, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../config/axiosInstance";
import { useMutation } from "react-query";

function CategoryAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: any) => {
    let newCategory = {
      name: data.name,
      description: data.description,
    };

    handleAddCategory(newCategory);
  };

  const addCategoryMutation = useMutation(
    (newCategory: any) => axiosInstance.post("category", newCategory),
    {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error("Add Category mutation error:", error);
      },
    }
  );

  const handleAddCategory = async (newCategory: any) => {
    try {
      await addCategoryMutation.mutateAsync(newCategory);
    } catch (error) {
      console.error("Add Category mutation error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="name"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("name", { required: true, maxLength: 10 })}
      />
      {errors.name?.type === "required" && <span>This field is required</span>}
      {errors.name?.type === "maxLength" && <span>maxLength 10</span>}
      <TextField
        label="description"
        variant="outlined"
        fullWidth
        margin="normal"
        {...register("description")}
      />
      {errors.description?.type === "required" && (
        <span>This field is required</span>
      )}
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={addCategoryMutation.isLoading} // İşlem devam ederken düğmeyi devre dışı bırak
      >
        {addCategoryMutation.isLoading ? (
          <CircularProgress size={24} />
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}

export default CategoryAdd;
