export function InputBox({ label, placeholder, onChange, type = "text" }) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded border border-slate-200 px-2 py-2"
      />
    </div>
}