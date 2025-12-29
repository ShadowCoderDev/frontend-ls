import { useState } from "react";
import { mockUser } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(mockUser);
  const [editData, setEditData] = useState(mockUser);
  const { toast } = useToast();

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    toast({
      title: "ذخیره شد",
      description: "اطلاعات پروفایل با موفقیت بروزرسانی شد",
    });
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  const InfoRow = ({
    icon: Icon,
    label,
    value,
    field,
    type = "text",
  }: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    field: keyof typeof mockUser;
    type?: string;
  }) => (
    <div className="flex items-start gap-4 p-4 border-2 border-foreground">
      <div className="p-2 border-2 border-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1">
        <Label className="text-sm text-muted-foreground">{label}</Label>
        {isEditing && field !== "joinDate" ? (
          <Input
            type={type}
            value={editData[field]}
            onChange={(e) => setEditData({ ...editData, [field]: e.target.value })}
            className="mt-1"
            dir={field === "email" ? "ltr" : "rtl"}
          />
        ) : (
          <p className="font-medium mt-1" dir={field === "email" ? "ltr" : "rtl"}>
            {value}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">پروفایل</h1>
          <p className="text-muted-foreground">مدیریت اطلاعات حساب کاربری</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" />
            ویرایش
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              ذخیره
            </Button>
            <Button onClick={handleCancel} variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              انصراف
            </Button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 p-6 border-2 border-foreground bg-card">
        <div className="w-20 h-20 border-2 border-foreground bg-muted flex items-center justify-center">
          <User className="h-10 w-10" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-muted-foreground">{userData.email}</p>
        </div>
      </div>

      {/* Info Cards */}
      <div className="space-y-4">
        <InfoRow
          icon={User}
          label="نام و نام خانوادگی"
          value={userData.name}
          field="name"
        />
        <InfoRow
          icon={Mail}
          label="ایمیل"
          value={userData.email}
          field="email"
          type="email"
        />
        <InfoRow
          icon={Phone}
          label="شماره تلفن"
          value={userData.phone}
          field="phone"
          type="tel"
        />
        <InfoRow
          icon={MapPin}
          label="آدرس"
          value={userData.address}
          field="address"
        />
        <InfoRow
          icon={Calendar}
          label="تاریخ عضویت"
          value={userData.joinDate}
          field="joinDate"
        />
      </div>

      {/* Danger Zone */}
      <div className="border-2 border-destructive p-4">
        <h3 className="font-bold text-destructive mb-2">منطقه خطر</h3>
        <p className="text-sm text-muted-foreground mb-4">
          با حذف حساب کاربری، تمام اطلاعات شما از بین خواهد رفت.
        </p>
        <Button variant="destructive">حذف حساب کاربری</Button>
      </div>
    </div>
  );
};

export default Profile;
