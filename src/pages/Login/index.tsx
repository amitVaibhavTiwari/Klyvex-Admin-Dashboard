import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import * as z from "zod";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    InputAdornment,
    IconButton,
    Link,
} from "@mui/material";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { api } from "../../Utils/api";
import toast from "react-hot-toast";
import CustomToast from "../../components/Toast/Toast";

const loginFormSchema = z.object({
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
    password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

type LoginResponse = {
    status?: "success" | "failed";
    message?: string;
}

type LoginError = {
    status?: "success" | "failed";
    message?: string;
}

const LoginPage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate, isPending } = useMutation<
        LoginResponse,
        AxiosError<LoginError>,
        LoginFormData
    >({
        mutationFn: async (data: LoginFormData) => {
            const resp = await api.post<LoginResponse>("/auth/login", {
                email: data.email,
                password: data.password,
            });
            return resp.data;
        },
        onSuccess: (data) => {
            if (data.status === "success") {
                toast.custom((t) => (
                    <CustomToast
                        toast={t}
                        variant="success"
                        title="Login Success!"
                        message="Successfully Logged In."
                    />
                ));
            }
            window.location.href = "/";
            reset();
        },
        onError: (error) => {
            console.error(
                "Login error: ",
                error.response?.data.message || error.message
            );
            toast.custom((t) => (
                <CustomToast
                    toast={t}
                    variant="error"
                    title="Login Error"
                    message={error.response?.data.message || error.message}
                />
            ));
        }
    });

    const onSubmit = (data: LoginFormData) => {
        mutate(data);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: 'background.default', display: "grid", placeItems: "center" }}>
            <Card
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 400,
                    borderRadius: 3,
                    overflow: "visible",
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            fontWeight="bold"
                            color="primary"
                            gutterBottom
                        >
                            Welcome Back
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Login to your account to continue
                        </Typography>
                    </Box>

                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Email Address"
                                    type="email"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdEmail color="action" />
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 2 }}
                                    autoComplete="email"
                                    disabled={isPending}
                                />
                            )}
                        />

                        <Controller
                            name="password"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdLock color="action" />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                    aria-label="toggle password visibility"
                                                    disabled={isPending}
                                                >
                                                    {showPassword ? (
                                                        <MdVisibilityOff />
                                                    ) : (
                                                        <MdVisibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    sx={{ mb: 1 }}
                                    autoComplete="current-password"
                                    disabled={isPending}
                                />
                            )}
                        />

                        <Box sx={{ textAlign: "right", mb: 3 }}>
                            <Link
                                href="#"
                                variant="body2"
                                onClick={(e) => {
                                    e.preventDefault();
                                    console.log("clicked forget password");
                                }}
                            >
                                Forgot password?
                            </Link>
                        </Box>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            disabled={isPending}
                            sx={{
                                mb: 2,
                                py: 1.5,
                            }}
                        >
                            {isPending ? "Logging In..." : "Login"}
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginPage;
