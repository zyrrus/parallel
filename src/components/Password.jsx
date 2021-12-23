export default function Password({ register }) {
    return (
        <>
            <label htmlFor='password'>Password</label>
            <input
                placeholder='Password'
                type='password'
                {...register("password", { required: true })}
            />
            <br />
        </>
    );
}
