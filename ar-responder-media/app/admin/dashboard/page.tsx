import { requireAuth } from "@/lib/auth"
import { getAllImages } from "@/lib/image-storage"
import AdminHeader from "@/components/admin/admin-header"
import ImageUploadForm from "@/components/admin/image-upload-form"
import ImageList from "@/components/admin/image-list"
import SupportersList from "@/components/admin/supporters-list"
import { getSupporters } from "@/app/actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Camera, Users, Eye, ArrowUp, ArrowDown } from "lucide-react"

export default async function AdminDashboard() {
  // Require authentication
  await requireAuth()

  // Get all images
  const images = await getAllImages()

  // Get all supporters
  const supporters = await getSupporters()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminHeader />

      <main className="container mx-auto py-8 px-4 flex-1">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Images</p>
                <p className="text-2xl font-bold">{images.length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  12% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Supporters</p>
                <p className="text-2xl font-bold">{supporters.length}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  5% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Page Views</p>
                <p className="text-2xl font-bold">2,845</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  18% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Downloads</p>
                <p className="text-2xl font-bold">487</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  3% from last month
                </p>
              </div>
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                <BarChart className="h-6 w-6 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="images" className="w-full">
          <TabsList className="mb-6 w-full md:w-auto">
            <TabsTrigger value="images" className="flex-1 md:flex-none">
              <Camera className="mr-2 h-4 w-4" />
              Gallery Images
            </TabsTrigger>
            <TabsTrigger value="supporters" className="flex-1 md:flex-none">
              <Users className="mr-2 h-4 w-4" />
              Supporters
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex-1 md:flex-none">
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Image</CardTitle>
                <CardDescription>Add new images to the gallery</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUploadForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Images</CardTitle>
                <CardDescription>Edit, categorize, and delete images</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageList images={images} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="supporters" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Manage Supporters</CardTitle>
                <CardDescription>Add, edit, and manage supporter information</CardDescription>
              </CardHeader>
              <CardContent>
                <SupportersList supporters={supporters} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Website Analytics</CardTitle>
                <CardDescription>View detailed website performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Analytics dashboard coming soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t py-4 bg-white mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          AR Responder Media Admin Panel &copy; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}
