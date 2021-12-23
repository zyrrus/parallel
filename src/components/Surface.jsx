export default function Surface({ classes, children }) {
    return (
        <div className={"surface " + (classes ? classes.join(" ") : "")}>
            {children}
        </div>
    );
}
