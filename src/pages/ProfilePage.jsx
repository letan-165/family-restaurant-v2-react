import { useRef, useState } from "react";
import TextButton from "../components/button/TextButton.jsx";
import DisplayField from "../components/text/DisplayField.jsx";
import FormField from "../components/text/FormField.jsx";
import {
  profileDisplayGroups,
  profileEditFields,
  profileView,
} from "../data/mockData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";

function ProfilePage() {
  useDocumentTitle("Hồ sơ - Quán Cô Lệ");

  const dialogRef = useRef(null);
  const fileInputRef = useRef(null);
  const [avatarPreview, setAvatarPreview] = useState(profileView.avatar);

  function openEditDialog() {
    dialogRef.current?.showModal();
  }

  function closeEditDialog() {
    dialogRef.current?.close();
  }

  function openFilePicker() {
    fileInputRef.current?.click();
  }

  function handleAvatarChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  }

  return (
    <section className="section-bg-two min-h-[calc(100vh-8rem)] py-10 sm:py-12">
      <div className="page-wrap">
        <div className="mx-auto grid max-w-5xl gap-6">
          <div className="card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={avatarPreview}
                alt={profileView.fullname}
                className="h-20 w-20 rounded-full border border-stone-200 object-cover"
              />
              <div>
                <p className="text-sm font-semibold text-brand-brown">
                  Hồ sơ tài khoản
                </p>
                <h1 className="font-display text-3xl font-bold text-brand-brown">
                  {profileView.fullname}
                </h1>
                <p className="mt-1 text-sm text-stone-600">
                  @{profileView.username} | {profileView.email}
                </p>
              </div>
            </div>

            <TextButton onClick={openEditDialog}>Chỉnh sửa thông tin</TextButton>
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
                {profileDisplayGroups.personal.map((field) => (
                  <DisplayField
                    key={field.valueKey}
                    label={field.label}
                    value={profileView[field.valueKey]}
                    className={field.className}
                  />
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="font-display text-2xl font-semibold text-brand-brown">
                Tài khoản
              </h2>
              <p className="mt-1 text-sm text-stone-600">
                Tóm tắt nhanh về cách đăng nhập và liên hệ.
              </p>

              <div className="mt-6 grid gap-4">
                {profileDisplayGroups.account.map((field) => (
                  <DisplayField
                    key={field.valueKey}
                    label={field.label}
                    value={profileView[field.valueKey]}
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

          <form className="grid gap-6 p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-stone-200 bg-stone-50 px-4 py-4">
              <img
                src={avatarPreview}
                alt={profileView.fullname}
                className="h-16 w-16 rounded-full object-cover"
              />

              <TextButton onClick={openFilePicker} variant="secondary">
                Chọn
              </TextButton>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              {profileEditFields.map((field) => (
                <div key={field.name} className={field.className}>
                  <FormField
                    as={field.as}
                    htmlFor={field.htmlFor}
                    label={field.label}
                    name={field.name}
                    type={field.type}
                    defaultValue={profileView[field.name]}
                  />
                </div>
              ))}
            </div>

            <TextButton>Lưu thay đổi</TextButton>
          </form>
        </dialog>
      </div>
    </section>
  );
}

export default ProfilePage;
