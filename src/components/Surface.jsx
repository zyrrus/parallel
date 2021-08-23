export default function Surface({ classes, children }) {
    let extraClasses = "";
    if (classes !== undefined) extraClasses = classes.join(" ");

    return <div className={"surface " + extraClasses}>{children}</div>;
}
