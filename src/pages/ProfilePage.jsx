import { useEffect, useRef, useState } from "react";
import { profileService } from "../api/services/profileService.js";
import TextButton from "../components/button/TextButton.jsx";
import DisplayField from "../components/text/DisplayField.jsx";
import FormField from "../components/text/FormField.jsx";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { normalizeProfile, saveUserSession } from "../utils/userSession.js";

const profileDisplayFields = [
  { label: "Họ và tên", valueKey: "fullName" },
  { label: "Số điện thoại", valueKey: "phone" },
  { label: "Địa chỉ", valueKey: "address", className: "sm:col-span-2" },
];

const profileEditFields = [
  { label: "Họ và tên", name: "fullName", type: "text" },
  { label: "Số điện thoại", name: "phone", type: "text" },
  {
    label: "Avatar URL",
    name: "avatar",
    type: "text",
    className: "sm:col-span-2",
  },
  {
    label: "Địa chỉ",
    name: "address",
    as: "textarea",
    className: "sm:col-span-2",
  },
];

const emptyProfile = {
  userId: "",
  fullName: "",
  phone: "",
  avatar: "",
  address: "",
};

function ProfilePage() {
  useDocumentTitle("Ho so - Quan Co Le");

  const dialogRef = useRef(null);
  const [profile, setProfile] = useState(() => normalizeProfile(emptyProfile));
  const [formData, setFormData] = useState(() =>
    normalizeProfile(emptyProfile),
  );
  const [avatarPreview, setAvatarPreview] = useState(
    () => normalizeProfile(emptyProfile).avatar,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchProfile() {
      try {
        const response = await profileService.get();
        const nextProfile = normalizeProfile(response?.result || {});

        if (!active) {
          return;
        }

        setProfile(nextProfile);
        setFormData(nextProfile);
        setAvatarPreview(nextProfile.avatar);
        saveUserSession(nextProfile);
      } catch (error) {
        if (!active) {
          return;
        }

        const fallbackProfile = normalizeProfile();
        setProfile(fallbackProfile);
        setFormData(fallbackProfile);
        setAvatarPreview(fallbackProfile.avatar);
        window.alert(error.message || "Không thể tải thông tin hồ sơ.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchProfile();

    return () => {
      active = false;
    };
  }, []);

  function openEditDialog() {
    setFormData(profile);
    setAvatarPreview(profile.avatar);
    dialogRef.current?.showModal();
  }

  function closeEditDialog() {
    dialogRef.current?.close();
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "avatar") {
      setAvatarPreview(value);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      const response = await profileService.update(formData);
      const nextProfile = normalizeProfile(response?.result || formData);

      setProfile(nextProfile);
      setFormData(nextProfile);
      setAvatarPreview(nextProfile.avatar);
      saveUserSession(nextProfile);
      closeEditDialog();
      window.alert("Cập nhật hồ sơ thành công.");
    } catch (error) {
      window.alert(error.message || "Không thể cập nhật hồ sơ.");
    } finally {
      setSaving(false);
    }
  }

  const displayName = profile.fullName || "Khách hàng";

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="page-grid">
          <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={displayName}
                  className="h-20 w-20 rounded-full border border-stone-200 object-cover"
                />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-stone-200 bg-stone-100 text-2xl font-semibold text-brand-brown">
                  {displayName.charAt(0)}
                </div>
              )}
              <div>
                <p className="text-sm font-semibold text-brand-brown">
                  Hồ sơ tài khoản
                </p>
                <h1 className="font-display text-3xl font-bold text-brand-brown">
                  {displayName}
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  {profile.userId || "Chưa có mã người dùng"} |{" "}
                  {profile.phone || "Chưa có số điện thoại"}
                </p>
              </div>
            </div>

            <TextButton onClick={openEditDialog} disabled={loading}>
              Chỉnh sửa thông tin
            </TextButton>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="card">
              <h2 className="font-display text-2xl font-semibold text-brand-brown">
                Thông tin cá nhân
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Những thông tin cần thiết để giao hàng và liên hệ.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {profileDisplayFields.map((field) => (
                  <DisplayField
                    key={field.valueKey}
                    label={field.label}
                    value={profile[field.valueKey] || "Chưa cập nhật"}
                    className={field.className}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <dialog
          ref={dialogRef}
          className="m-auto w-[calc(100%-2rem)] max-w-2xl rounded-2xl border border-stone-200 bg-white p-0 shadow-sm backdrop:bg-black/20"
        >
          <form
            method="dialog"
            className="flex items-start justify-between gap-4 border-b border-stone-200 px-6 py-4 sm:px-8"
          >
            <h2 className="font-display text-2xl font-semibold text-brand-brown">
              Chỉnh sửa hồ sơ
            </h2>
            <TextButton
              onClick={closeEditDialog}
              variant="ghost"
              className="px-3 py-2"
            >
              Đóng
            </TextButton>
          </form>

          <form className="grid gap-6 p-6 sm:p-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt={displayName}
                  className="h-16 w-16 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-stone-200 text-lg font-semibold text-brand-brown">
                  {displayName.charAt(0)}
                </div>
              )}

              <p className="text-sm text-stone-600">
                API profile hiện tại dùng chuỗi avatar, bạn có thể dán URL ảnh.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {profileEditFields.map((field) => (
                <div key={field.name} className={field.className}>
                  <FormField
                    as={field.as}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <TextButton type="submit" disabled={saving}>
              {saving ? "Đang lưu..." : "Lưu thay đổi"}
            </TextButton>
          </form>
        </dialog>
      </div>
    </section>
  );
}

export default ProfilePage;
