jsPlumb.ready(function () {

    const instance = jsPlumb.getInstance({
        Connector: ["Flowchart", { cornerRadius: 5 }],
        PaintStyle: { stroke: "#3a7bd5", strokeWidth: 2 },
        EndpointStyle: { fill: "#3a7bd5", radius: 4 },
        Anchors: ["Continuous", "Continuous"],
        ConnectionOverlays: [
            ["Arrow", { width: 10, length: 10, location: 1 }]
        ]
    });

    const nodes = document.querySelectorAll(".erd-node");

    nodes.forEach(node => {
        instance.draggable(node);
    });

    function connect(source, target, color = "#3a7bd5") {
        instance.connect({
            source: source,
            target: target,
            paintStyle: { stroke: color, strokeWidth: 2 },
            overlays: [
                ["Arrow", { width: 10, length: 10, location: 1 }]
            ]
        });
    }

    // Relationships based on your ERD
    connect("client", "business");
    connect("business", "business_location");
    connect("business", "business_partner");
    connect("business", "business_document");

    connect("client", "cases");
    connect("cases", "cases_service");
    connect("cases_service", "service");

    connect("cases", "receipt");
    connect("receipt", "receipt_item");

    connect("office_cases", "office_case_stages");
    connect("office_cases", "office_case_tasks");
    connect("office_cases", "office_case_documents");

    connect("office_case_stages", "office_case_stage_history");
    connect("office_case_tasks", "office_case_task_history");

});

function showModule(type) {

    const nodes = document.querySelectorAll(".erd-node");

    nodes.forEach(node => {
        if (type === "all") {
            node.style.display = "block";
        } else if (node.classList.contains("module-" + type)) {
            node.style.display = "block";
        } else {
            node.style.display = "none";
        }
    });
}