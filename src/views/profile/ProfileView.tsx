import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuth } from "@/hooks/useAuth"

import { toast } from "sonner"
import { udpatePasswordAction } from "@/actions/auth/update-password.action"
import { updateUsernameAction } from "@/actions/auth/update-username.action"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSidebarStore } from "@/store/sidebar.store"
import { passwordUpdateSchema, type PasswordUpdateForm } from "@/types/auth/auth.types"
import { Fingerprint, User } from "lucide-react"


export default function ProfileView() {
  const { handleItemClick } = useSidebarStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | undefined>('');
  const { data } = useAuth();

  const queryClient = useQueryClient();


  const form = useForm<PasswordUpdateForm>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  useEffect(() => {
    setUsername(data?.username);
  }, [data])

  const { mutate: mtPassword } = useMutation({
    mutationFn: udpatePasswordAction,
    onError: (error: TypeError) => {
      form.reset();
      toast.error(error.message);
    },
    onSuccess: (data) => {
      form.reset();
      toast.success(data);
      handleItemClick('Inicio');
      navigate('/home')
    }
  });

  const { mutate } = useMutation({
    mutationFn: updateUsernameAction,
    onError: (error: TypeError) => {
      toast.error(error.message);
      form.reset();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['userAuth'] })
      toast.success(data);
      form.reset();
      handleItemClick('Inicio');
      navigate('/home')
    }
  })

  const onSubmit = (data: PasswordUpdateForm) => {
    mtPassword(data);
  }

  return (
    <div data-aos="fade-in" data-aos-duration="300">
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">
            <User />  Mi Perfil
          </TabsTrigger>
          <TabsTrigger value="change-password">
            <Fingerprint />
            Cambiar Password
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="w-full lg:w-3/5 mx-auto my-auto mt-10">
            <h1 className="text-3xl font-bold">Mi Perfil</h1>
            <p className="text-sm text-muted-foreground">Actualiza el nombre de usuario</p>

            <Card className="mt-5">
              <CardContent className="space-y-4">
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  id="username"
                  value={username ?? ""}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <Button
                  className="w-full"
                  type="button"
                  onClick={() => mutate(username)}
                >Guardar Cambios</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="change-password">
          <div className="w-full lg:w-3/5 mx-auto my-auto mt-10">
            <h1 className="text-3xl font-bold">Cambiar Password</h1>
            <p className="text-sm text-muted-foreground">Ingresa la contraseña actual y la nueva contraseña</p>

            <Card className="mt-5">
              <CardContent className="space-y-4">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 lg:space-y-10 mt-5">
                  <div className="grid gap-4">
                    <Controller
                      control={form.control}
                      name="currentPassword"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Contraseña Actual</FieldLabel>
                          <Input
                            type="password"
                            {...field}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="newPassword"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Nueva Contraseña</FieldLabel>
                          <Input
                            type="password"
                            {...field}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />

                    <Controller
                      control={form.control}
                      name="confirmPassword"
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Repetir Contraseña</FieldLabel>
                          <Input
                            type="password"
                            {...field}
                          />
                          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                      )}
                    />
                    <Button className="w-full" type="submit">Cambiar Password</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
