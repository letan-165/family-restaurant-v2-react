import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../api/services/authService.js";
import TextButton from "../components/button/TextButton.jsx";
import FormField from "../components/text/FormField.jsx";
import SectionTitle from "../components/text/SectionTitle.jsx";
import { authTabs, loginFields, signupFields } from "../data/siteData.js";
import useDocumentTitle from "../hooks/useDocumentTitle.js";
import { saveUserSession } from "../utils/userSession.js";

function AuthPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(authTabs[0].key);
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isLogin = activeTab === "login";
  const fields = isLogin ? loginFields : signupFields;

  useDocumentTitle(`${isLogin ? "Dang nhap" : "Dang ky"} - Quan Co Le`);

  function resetForm(nextTab) {
    setActiveTab(nextTab);
    setFormData({});
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = isLogin
        ? await authService.login(formData)
        : await authService.signup(formData);

      if (isLogin) {
        const loginResult = response?.result || {};
        const token = loginResult.token;
        const userId = loginResult.userId || loginResult.userID;
        const fullName = loginResult.fullName || loginResult.fullname;

        saveUserSession({
          token,
          userId,
          fullName,
        });

        window.alert("Đăng nhập thành công.");
        navigate("/");
      } else {
        window.alert("Đăng ký thành công. Vui lòng đăng nhập.");
        setActiveTab("login");
        setFormData({});
      }
    } catch (error) {
      window.alert(error.message || "Không thể kết nối tới máy chủ.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="page-section">
      <div className="page-wrap">
        <div className="mx-auto grid max-w-3xl gap-6">
          <div className="card">
            <SectionTitle
              label="Tai khoan"
              title={isLogin ? "Dang nhap" : "Tao tai khoan"}
              center
            />

            <div className="mt-6 flex justify-center gap-3">
              {authTabs.map((tab) => (
                <TextButton
                  key={tab.key}
                  variant={tab.key === activeTab ? "primary" : "secondary"}
                  onClick={() => resetForm(tab.key)}
                >
                  {tab.label}
                </TextButton>
              ))}
            </div>
          </div>

          <div className="card">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              {fields.map((field) => (
                <FormField
                  key={field.name}
                  {...field}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                />
              ))}

              <TextButton type="submit" className="mt-2" disabled={submitting}>
                {submitting
                  ? "Đang xử lý..."
                  : isLogin
                    ? "Đăng nhập"
                    : "Đăng ký"}
              </TextButton>
            </form>

            <div className="mt-4 text-center text-sm text-stone-500">
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
              <button
                type="button"
                className="font-medium text-brand-brown"
                onClick={() => resetForm(isLogin ? "signup" : "login")}
              >
                {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AuthPage;
