export default function Input({ label, data, register }) {
    return (
        <>
            <label htmlFor={data}>{label}</label>
            <input
                placeholder={label}
                {...register(data, { required: true })}
            />
            <br />
        </>
    );
}
