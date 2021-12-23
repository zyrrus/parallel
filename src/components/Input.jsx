export default function Input({ label, data, register }) {
    return (
        <>
            <label htmlFor={data}>{label}</label>
            <input
                placeholder={label}
                type='text'
                {...register(data, { required: true })}
            />
            <br />
        </>
    );
}
