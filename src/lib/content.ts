export type Course = {
  slug: string;
  code: string;
  title: string;
  short: string;
  level: "Foundation" | "Core" | "Advanced" | "Elective";
  discipline: string;
  duration: string;
  format: string;
  overview: string;
  outcomes: string[];
  modules: { title: string; points: string[] }[];
  prerequisites: string[];
  tools: string[];
  project: string;
  careers: string[];
  featured?: boolean;
  image: string;
};

export const courses: Course[] = [
  {
    slug: "vlsi-fundamentals",
    code: "CRX-101",
    title: "VLSI Design Fundamentals",
    image: '/images/vlsi-fundamentals.jpg',
    short:
      "The physics, logic and flow behind modern integrated circuits — the entry point into semiconductor engineering.",
    level: "Foundation",
    discipline: "VLSI Core",
    duration: "8 weeks · instructor-guided",
    format: "Live online + lab exercises",
    overview:
      "A rigorous introduction to how digital silicon is specified, designed and manufactured. The course connects device-level intuition — transistors, gates, interconnect — with the complete RTL-to-GDSII flow so every later specialisation has a solid footing. Learners finish with a working mental model of the entire semiconductor value chain.",
    outcomes: [
      "Explain CMOS device behaviour and how it shapes timing, power and area",
      "Read and reason about gate-level and transistor-level schematics",
      "Describe every stage of the ASIC flow and what each tool category does",
      "Execute small designs through a guided open-source RTL-to-GDSII flow",
      "Speak the shared vocabulary used across design, verification and PD teams",
    ],
    modules: [
      {
        title: "Semiconductor devices & CMOS basics",
        points: [
          "MOSFET operation, regions, characteristics",
          "Inverter analysis, noise margins, propagation delay",
          "Interconnect RC effects and why they dominate advanced nodes",
        ],
      },
      {
        title: "Digital building blocks",
        points: [
          "Combinational and sequential logic design",
          "Timing parameters: setup, hold, clock-to-Q",
          "Finite state machines and datapath thinking",
        ],
      },
      {
        title: "The RTL-to-GDSII flow",
        points: [
          "Specification, micro-architecture, RTL coding",
          "Verification, logic synthesis, DFT insertion",
          "Floorplanning, place & route, signoff, tape-out",
        ],
      },
      {
        title: "Guided flow lab",
        points: [
          "Simulate, synthesise and physically implement a small RTL block",
          "Inspect timing reports and layout artefacts",
          "Document results the way engineering teams do",
        ],
      },
    ],
    prerequisites: [
      "Basic digital electronics (logic gates, flip-flops)",
      "Any programming experience helps but is not required",
    ],
    tools: ["Open-source HDL simulators", "Open PDK-based flow", "Waveform viewers"],
    project:
      "Take a small RTL design from simulation through synthesis to a viewed layout, with a written engineering report.",
    careers: ["VLSI graduate engineer", "Design intern", "CAD / flow assistant"],
    featured: true,
  },
  {
    slug: "rtl-design-systemverilog",
    code: "CRX-201",
    title: "RTL Design with Verilog & SystemVerilog",
    image: '/images/rtl-design.jpg',
    short:
      "Write synthesisable, review-quality RTL the way professional design teams expect it.",
    level: "Core",
    discipline: "RTL Design",
    duration: "10 weeks · instructor-guided",
    format: "Live online + design labs",
    overview:
      "A deep, hands-on treatment of register-transfer-level design. Learners move beyond textbook syntax into micro-architecture decisions: pipelining, clock-domain discipline, reset strategy, FSM design and interface protocols. Code is reviewed against the standards used in industrial design teams.",
    outcomes: [
      "Write clean, synthesisable Verilog and SystemVerilog RTL",
      "Design pipelines, FIFOs, arbiters and FSM-based controllers",
      "Apply clock-domain-crossing and reset best practices",
      "Use assertions and lint feedback to harden RTL early",
      "Document micro-architecture for verification and PD handoff",
    ],
    modules: [
      {
        title: "Language essentials for design",
        points: [
          "Always blocks, data types, interfaces, packages",
          "Synthesisable vs simulation-only constructs",
          "Common RTL pitfalls and code-review patterns",
        ],
      },
      {
        title: "Micro-architecture patterns",
        points: [
          "Pipelining, stalls, valid/ready handshakes",
          "FIFO design, arbitration, flow control",
          "FSM styles and safe state encoding",
        ],
      },
      {
        title: "Clock, reset & CDC",
        points: [
          "Reset strategies: sync, async, deassertion hazards",
          "Clock-domain crossing with synchronisers and handshakes",
          "Static checks and reconvergence analysis",
        ],
      },
      {
        title: "Design project",
        points: [
          "Specify and implement a multi-block RTL design",
          "Iterative review cycles with mentor feedback",
          "Final design walkthrough, professional-style",
        ],
      },
    ],
    prerequisites: [
      "Digital logic fundamentals (CRX-101 or equivalent)",
      "Comfort writing small programs in any language",
    ],
    tools: ["Icarus Verilog / Verilator", "SV-aware simulators", "Lint tooling", "GTKWave"],
    project:
      "Design and verify a protocol-based processing block with CDC handling, reviewed through staged code reviews.",
    careers: ["RTL design engineer", "ASIC design engineer", "FPGA engineer"],
    featured: true,
  },
  {
    slug: "functional-verification",
    code: "CRX-202",
    title: "Functional Verification Essentials",
    image: '/images/verification.jpg',
    short:
      "Build constrained-random, coverage-driven testbenches that find real bugs before silicon does.",
    level: "Core",
    discipline: "Verification",
    duration: "10 weeks · instructor-guided",
    format: "Live online + verification labs",
    overview:
      "Verification consumes the majority of modern ASIC effort, and this course teaches it as an engineering discipline rather than a scripting exercise. Learners plan verification from a specification, build SystemVerilog testbenches, drive constrained-random stimulus and close coverage with intent.",
    outcomes: [
      "Derive a verification plan from a design specification",
      "Build layered, reusable SystemVerilog testbench components",
      "Apply constrained-random stimulus and functional coverage",
      "Use assertions to localise failures quickly",
      "Track bugs and coverage closure like a project team",
    ],
    modules: [
      {
        title: "Verification thinking",
        points: [
          "Verification planning, features, scenarios, coverage goals",
          "Directed vs constrained-random strategies",
          "Bug hunting: corner cases engineers actually miss",
        ],
      },
      {
        title: "SystemVerilog for verification",
        points: [
          "Classes, randomisation, constraints",
          "Mailboxes, queues, interfaces, virtual interfaces",
          "Scoreboards, monitors and reference models",
        ],
      },
      {
        title: "Coverage-driven methodology",
        points: [
          "Functional coverage modelling: covergroups and crosses",
          "Assertions (SVA) for protocol and temporal checks",
          "Coverage analysis and closure strategies",
        ],
      },
      {
        title: "Verification project",
        points: [
          "Verify a realistic RTL block from plan to closure",
          "Regression runs and failure triage",
          "Coverage report review with mentors",
        ],
      },
    ],
    prerequisites: [
      "Working knowledge of SystemVerilog (CRX-201 level)",
      "Digital design fundamentals",
    ],
    tools: ["SV-capable simulators", "Functional coverage", "SVA", "Regression scripting"],
    project:
      "Plan, implement and close a coverage-driven verification environment for a multi-interface RTL design.",
    careers: ["Verification engineer", "ASIC DV engineer", "FPGA verification engineer"],
    featured: true,
  },
  {
    slug: "systemverilog-uvm",
    code: "CRX-301",
    title: "SystemVerilog & UVM Methodology",
    image: '/images/uvm.jpg',
    short:
      "Architect industrial-scale UVM environments: agents, sequences, register models and reuse.",
    level: "Advanced",
    discipline: "Verification",
    duration: "12 weeks · instructor-guided",
    format: "Live online + project labs",
    overview:
      "The Universal Verification Methodology is the industry's common language for large-scale functional verification. This course builds complete UVM environments from scratch, explaining not just the mechanics of uvm_components but the architectural reasoning that keeps environments maintainable across projects and teams.",
    outcomes: [
      "Architect full UVM environments with agents, envs and tests",
      "Write sequence libraries and virtual sequences for complex stimulus",
      "Integrate register abstraction models and adapters",
      "Build reusable VIP-style components with configuration control",
      "Debug environments using phasing, objections and report servers",
    ],
    modules: [
      {
        title: "UVM architecture",
        points: [
          "Components, TLM ports, analysis ports",
          "Agents, drivers, monitors, scoreboards",
          "Configuration and factory patterns for reuse",
        ],
      },
      {
        title: "Stimulus and sequences",
        points: [
          "Sequence items, sequences, sequencers",
          "Virtual sequences for multi-agent scenarios",
          "Layered stimulus for protocol stacks",
        ],
      },
      {
        title: "Register layer & environments",
        points: [
          "Register models, adapters, predictors",
          "Subsystem-level vs block-level environments",
          "Coverage and assertions inside UVM",
        ],
      },
      {
        title: "Capstone environment",
        points: [
          "Full UVM environment for a protocol block",
          "Regression, triage and coverage closure",
          "Code review against industry style guides",
        ],
      },
    ],
    prerequisites: [
      "Functional Verification Essentials (CRX-202) or equivalent experience",
      "Solid object-oriented SystemVerilog",
    ],
    tools: ["UVM 1.2", "SV simulators", "Regression tooling", "Coverage analysis"],
    project:
      "Build a reusable UVM verification environment with register model and virtual sequences for an SoC-style block.",
    careers: ["Senior verification engineer", "VIP developer", "Verification architect (path)"],
  },
  {
    slug: "physical-design",
    code: "CRX-210",
    title: "Physical Design & Implementation",
    image: '/images/physical-design.jpg',
    short:
      "From netlist to tape-out: floorplanning, placement, clock-tree synthesis, routing and closure.",
    level: "Core",
    discipline: "Physical Design",
    duration: "12 weeks · instructor-guided",
    format: "Live online + implementation labs",
    overview:
      "Physical design turns verified RTL into manufacturable geometry. Learners work through the complete implementation flow — synthesis handoff, floorplanning, power planning, placement, CTS, routing, and physical verification — while building intuition for the timing, congestion and power trade-offs that define real closure work.",
    outcomes: [
      "Floorplan blocks with sound macro, power and IO strategy",
      "Run and interpret placement, CTS and routing stages",
      "Analyse and fix setup/hold violations across corners",
      "Perform physical verification: DRC, LVS, antenna checks",
      "Close a block-level design to signoff-style criteria",
    ],
    modules: [
      {
        title: "Synthesis & netlist handoff",
        points: [
          "Logic synthesis, timing constraints (SDC)",
          "Multi-corner multi-mode concepts",
          "Netlist quality and its downstream effects",
        ],
      },
      {
        title: "Floorplan & power plan",
        points: [
          "Die sizing, macro placement, blockages",
          "Power grid design and IR-drop awareness",
          "IO and bump planning considerations",
        ],
      },
      {
        title: "Placement, CTS & routing",
        points: [
          "Global/detailed placement, congestion analysis",
          "Clock-tree synthesis: skew, latency, useful skew",
          "Routing, optimization and ECO flows",
        ],
      },
      {
        title: "Signoff & closure",
        points: [
          "Static timing analysis at block level",
          "DRC/LVS debug methodology",
          "Timing closure iterations to targets",
        ],
      },
    ],
    prerequisites: [
      "VLSI fundamentals and RTL basics (CRX-101 / CRX-201 level)",
      "Comfort with scripted tool flows",
    ],
    tools: ["PnR tool flows", "STA tools", "Physical verification", "Tcl scripting"],
    project:
      "Implement a timing-critical block end-to-end and deliver a closure report with violation analysis and fixes.",
    careers: ["Physical design engineer", "PnR engineer", "CAD implementation engineer"],
    featured: true,
  },
  {
    slug: "dft-engineering",
    code: "CRX-220",
    title: "Design for Testability (DFT)",
    image: '/images/verification.jpg',
    short:
      "Scan, ATPG, boundary scan and MBIST — make silicon testable, diagnosable and manufacturable.",
    level: "Advanced",
    discipline: "DFT",
    duration: "8 weeks · instructor-guided",
    format: "Live online + labs",
    overview:
      "A design that cannot be tested cannot ship. This course covers the structures and methodologies that make complex silicon economically testable: scan insertion, ATPG pattern generation, memory built-in self-test, boundary scan and diagnosis, with attention to how DFT decisions interact with timing and power.",
    outcomes: [
      "Insert and verify scan chains in a gate-level netlist",
      "Generate and evaluate ATPG patterns for stuck-at and transition faults",
      "Explain MBIST and boundary-scan architectures",
      "Measure coverage, pattern count and test-time trade-offs",
      "Anticipate DFT interactions with PD and timing closure",
    ],
    modules: [
      {
        title: "Manufacturing test fundamentals",
        points: [
          "Fault models: stuck-at, transition, bridging",
          "Test economics: coverage, pattern count, test time",
          "ATE and the production test flow",
        ],
      },
      {
        title: "Scan & ATPG",
        points: [
          "Scan architecture and chain stitching",
          "ATPG flow: generation, compression, coverage debug",
          "Handling scan-unfriendly logic",
        ],
      },
      {
        title: "Memory test & boundary scan",
        points: [
          "MBIST controllers and algorithms",
          "JTAG / IEEE 1149.1 boundary scan",
          "Diagnosis and yield-feedback loop",
        ],
      },
      {
        title: "DFT lab",
        points: [
          "Insert scan and run ATPG on a real netlist",
          "Coverage debug and report interpretation",
          "Chain debug simulation workflow",
        ],
      },
    ],
    prerequisites: ["Gate-level design knowledge", "STA basics helpful"],
    tools: ["DFT insertion tools", "ATPG tools", "Pattern simulation"],
    project:
      "Take a gate-level netlist through scan insertion and ATPG, then debug coverage to a target threshold.",
    careers: ["DFT engineer", "Test engineer", "Silicon bring-up engineer (path)"],
  },
  {
    slug: "asic-soc-development",
    code: "CRX-310",
    title: "ASIC & SoC Development",
    image: '/images/physical-design.jpg',
    short:
      "Architect complete SoCs: buses, processors, peripherals, integration and system verification.",
    level: "Advanced",
    discipline: "SoC / ASIC",
    duration: "12 weeks · instructor-guided",
    format: "Live online + integration labs",
    overview:
      "Modern chips are systems. This course covers end-to-end SoC development: architecture decomposition, bus architectures (AMBA family), IP integration, clock/reset/power domains, system-level verification and the management of a full-chip flow from specification to tape-out readiness.",
    outcomes: [
      "Decompose a product specification into SoC architecture",
      "Work fluently with AMBA AHB/APB/AXI interconnect",
      "Integrate processors, memories and custom IP blocks",
      "Plan clock, reset and power-domain architecture",
      "Coordinate system-level verification and top-level flows",
    ],
    modules: [
      {
        title: "SoC architecture",
        points: [
          "Requirement decomposition and IP planning",
          "Bus architectures: AHB, APB, AXI fundamentals",
          "Memory maps, address decode, system control",
        ],
      },
      {
        title: "Integration engineering",
        points: [
          "Processor and peripheral integration",
          "Clock/reset/power domain design",
          "Top-level RTL assembly and connectivity checks",
        ],
      },
      {
        title: "System verification",
        points: [
          "Subsystem vs SoC-level verification strategy",
          "Firmware-aware testbench methods",
          "Boot, interrupt and DMA scenario testing",
        ],
      },
      {
        title: "Full-chip perspective",
        points: [
          "SoC implementation flow overview",
          "IP quality and deliverable standards",
          "Tape-out checklists and signoff ownership",
        ],
      },
    ],
    prerequisites: ["RTL design proficiency (CRX-201)", "Verification basics recommended"],
    tools: ["SoC integration flows", "AMBA VIP", "System simulators"],
    project:
      "Integrate a small multi-IP SoC with bus fabric, peripherals and a software-visible register map, verified at system level.",
    careers: ["SoC design engineer", "Integration engineer", "SoC verification engineer"],
  },
  {
    slug: "embedded-systems",
    code: "CRX-230",
    title: "Embedded Systems & Firmware",
    image: '/images/embedded.jpg',
    short:
      "Bare-metal to RTOS: firmware that brings silicon to life and validates hardware early.",
    level: "Core",
    discipline: "Embedded",
    duration: "10 weeks · instructor-guided",
    format: "Live online + hardware labs",
    overview:
      "The bridge between hardware and software. Learners write firmware for microcontrollers and SoC-class targets: register-level programming, peripheral drivers, interrupts, DMA, real-time operating systems and the hardware/software debug loop used in silicon validation environments.",
    outcomes: [
      "Program peripherals at register level from datasheets",
      "Write interrupt-driven and DMA-based firmware",
      "Use an RTOS: tasks, queues, synchronisation",
      "Debug hardware/software issues with structured methods",
      "Support silicon validation and board bring-up activities",
    ],
    modules: [
      {
        title: "Bare-metal foundations",
        points: [
          "Memory-mapped IO and register programming",
          "Startup code, linker scripts, build systems",
          "GPIO, timers, UART, SPI, I²C drivers",
        ],
      },
      {
        title: "Concurrency & real-time",
        points: [
          "Interrupt architecture and latency analysis",
          "DMA and double-buffering patterns",
          "RTOS concepts: scheduling, IPC, priority inversion",
        ],
      },
      {
        title: "Hardware/software co-debug",
        points: [
          "Debug interfaces: JTAG, SWD, trace",
          "Reading waveforms against firmware behaviour",
          "Structured bring-up methodology",
        ],
      },
      {
        title: "Firmware project",
        points: [
          "DMA-based peripheral driver + RTOS application",
          "Diagnostics and production-test thinking",
          "Documentation for hardware team handoff",
        ],
      },
    ],
    prerequisites: ["C programming", "Digital electronics basics"],
    tools: ["ARM-class toolchains", "JTAG/SWD debuggers", "FreeRTOS-class RTOS", "Logic analysers"],
    project:
      "Build a DMA-driven data-acquisition firmware stack with diagnostics, documented for hardware validation use.",
    careers: ["Embedded engineer", "Firmware engineer", "Silicon validation engineer (path)"],
  },
  {
    slug: "ai-augmented-design",
    code: "CRX-401",
    title: "AI-Augmented Design & Verification",
    image: '/images/ai-design.jpg',
    short:
      "Integrate AI coding assistants into RTL and verification workflows with human review discipline.",
    level: "Elective",
    discipline: "AI × Silicon",
    duration: "6 weeks · instructor-guided",
    format: "Live online + guided labs",
    overview:
      "AI tools are entering the engineering loop — this course teaches how to use them responsibly. Learners integrate coding assistants into RTL authoring, testbench generation and coverage analysis, while maintaining the human review discipline that makes engineering credible.",
    outcomes: [
      "Use AI assistants for RTL scaffolding, FSM templates and protocol boilerplate",
      "Generate and review constrained-random testbench components with AI",
      "Apply AI to assertion drafting and coverage gap analysis",
      "Establish review gates for every AI-assisted artefact",
      "Document AI usage for auditability and knowledge transfer",
    ],
    modules: [
      {
        title: "AI in the engineering loop",
        points: [
          "How LLMs change RTL and verification workflows",
          "Hallucination risks and review discipline",
          "Audit trails for AI-assisted work",
        ],
      },
      {
        title: "AI in RTL authoring",
        points: [
          "Micro-architecture to RTL scaffolding",
          "Interface and protocol boilerplate generation",
          "CDC pattern templates and review checklists",
        ],
      },
      {
        title: "AI in verification productivity",
        points: [
          "Coverage-directed stimulus ideas",
          "Assertion generation and review",
          "Triage assistance and log analysis",
        ],
      },
      {
        title: "ML for design exploration",
        points: [
          "Design-space exploration fundamentals",
          "Surrogate models and optimisation intuition",
          "Case studies of ML-assisted implementation",
        ],
      },
    ],
    prerequisites: [
      "RTL design and verification fundamentals (CRX-201/202)",
      "Curiosity and critical judgement",
    ],
    tools: ["AI coding assistants", "Simulation flows", "Python notebooks"],
    project:
      "Complete a small verified design where every AI-assisted artefact is closed with human-written checks and documented review.",
    careers: ["Design/verification engineer (AI-augmented)", "CAD & methodology engineer (path)"],
  },
  {
    slug: "industry-internship",
    code: "CRX-500",
    title: "Industry Internship Track",
    image: '/images/about-team.jpg',
    short:
      "Mentored, project-based placement inside a live engineering workflow for programme graduates.",
    level: "Advanced",
    discipline: "Career",
    duration: "8–16 weeks · mentored",
    format: "Project-based · milestone reviews",
    overview:
      "A structured bridge from training to professional engineering. Interns work on scoped, real engineering projects under mentor supervision with weekly milestone reviews, code review discipline and professional deliverable standards. Places are limited by mentor capacity and project availability.",
    outcomes: [
      "Deliver professional-quality engineering work against a specification",
      "Operate inside real review cadences and documentation standards",
      "Build a defensible portfolio of engineering work",
      "Communicate progress in stand-ups and written reports",
      "Receive structured performance feedback from engineers",
    ],
    modules: [
      {
        title: "Project onboarding",
        points: [
          "Environment setup and workflow training",
          "Specification study and planning",
          "Weekly milestone definition",
        ],
      },
      {
        title: "Execution & reviews",
        points: [
          "Engineering execution with mentor support",
          "Code and report review cycles",
          "Mid-point technical presentation",
        ],
      },
      {
        title: "Delivery & wrap-up",
        points: [
          "Final deliverable and documentation",
          "Exit presentation to engineering panel",
          "Reference portfolio assembly",
        ],
      },
    ],
    prerequisites: [
      "Completion of a relevant Chiprion programme",
      "Selection review (technical assessment applies)",
    ],
    tools: ["Project-dependent industry-standard toolchains"],
    project: "A scoped engineering deliverable defined with the host project and mentor.",
    careers: ["Entry into design, verification, PD or embedded roles"],
  },
];

export const disciplines = [
  {
    id: "rtl",
    name: "RTL Design",
    code: "01",
    hook: "Specify. Abstract. Implement.",
    text: "Micro-architecture and synthesisable RTL in Verilog and SystemVerilog — where specification becomes structure.",
    skills: ["Pipelining", "CDC discipline", "Protocol interfaces", "Micro-architecture docs"],
    course: "rtl-design-systemverilog",
  },
  {
    id: "dv",
    name: "Functional Verification",
    code: "02",
    hook: "Bugs are cheaper in simulation.",
    text: "Constrained-random, coverage-driven, assertion-based verification — SystemVerilog testbenches through to full UVM environments.",
    skills: ["Verification planning", "SystemVerilog OOP", "UVM architecture", "Coverage closure"],
    course: "functional-verification",
  },
  {
    id: "pd",
    name: "Physical Design",
    code: "03",
    hook: "Netlist in. Silicon out.",
    text: "Floorplanning, placement, clock-tree synthesis, routing and signoff — the engineering of manufacturable geometry.",
    skills: ["Floorplan & power plan", "CTS & routing", "STA closure", "DRC/LVS debug"],
    course: "physical-design",
  },
  {
    id: "dft",
    name: "Design for Testability",
    code: "04",
    hook: "If you can't test it, you can't ship it.",
    text: "Scan insertion, ATPG, MBIST and boundary scan — making complex silicon economically testable and diagnosable.",
    skills: ["Scan architecture", "ATPG & compression", "MBIST", "Diagnosis"],
    course: "dft-engineering",
  },
  {
    id: "soc",
    name: "ASIC & SoC Development",
    code: "05",
    hook: "Chips are systems.",
    text: "Bus fabrics, IP integration, multi-domain clocking and system-level verification — full-chip engineering from spec to tape-out.",
    skills: ["AMBA interconnect", "IP integration", "Power domains", "System verification"],
    course: "asic-soc-development",
  },
  {
    id: "emb",
    name: "Embedded Systems",
    code: "06",
    hook: "Where hardware meets software.",
    text: "Bare-metal drivers, RTOS firmware and hardware/software co-debug — the discipline that brings silicon to life.",
    skills: ["Register-level drivers", "DMA & interrupts", "RTOS", "Bring-up & validation"],
    course: "embedded-systems",
  },
  
];

export type Service = {
  id: string;
  code: string;
  title: string;
  status: "Offered" | "Scoped per engagement" | "Planned";
  text: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "rtl-services",
    code: "ENG-01",
    title: "RTL Design & Development",
    status: "Offered",
    text: "Design of synthesisable RTL blocks and subsystems in Verilog/SystemVerilog, from micro-architecture documentation through reviewed, lint-clean deliverables.",
    points: ["IP blocks and subsystem RTL", "Micro-architecture specification", "CDC/reset hardening", "Code review & remediation of legacy RTL"],
  },
  {
    id: "dv-services",
    code: "ENG-02",
    title: "Functional Verification Services",
    status: "Offered",
    text: "Block and subsystem-level functional verification: planning, SystemVerilog/UVM environments, coverage closure support and regression setup.",
    points: ["Verification planning from spec", "UVM environment build-out", "Coverage closure assistance", "Regression & triage workflows"],
  },
  {
    id: "dv-consulting",
    code: "ENG-03",
    title: "Design Verification Consulting",
    status: "Scoped per engagement",
    text: "Independent review of verification methodology, environment audits, and rescue work for programmes struggling with quality or schedule.",
    points: ["Methodology audits", "Environment health checks", "Coverage strategy review", "Team mentoring on verification discipline"],
  },
  {
    id: "pd-services",
    code: "ENG-04",
    title: "Physical Design Support",
    status: "Scoped per engagement",
    text: "Implementation support across floorplanning, CTS, routing and timing closure, delivered by engineers working inside your flow and constraints.",
    points: ["Block-level implementation", "Timing closure assistance", "Physical verification debug", "Flow automation (Tcl/Python)"],
  },
  {
    id: "dft-services",
    code: "ENG-05",
    title: "DFT & Test Solutions",
    status: "Scoped per engagement",
    text: "Scan architecture, insertion, ATPG setup and coverage debugging for designs approaching tape-out or post-silicon test planning.",
    points: ["Scan insertion & verification", "ATPG setup and coverage debug", "MBIST planning", "Pattern simulation support"],
  },
  {
    id: "soc-services",
    code: "ENG-06",
    title: "ASIC / SoC Engineering",
    status: "Scoped per engagement",
    text: "Integration engineering for multi-IP SoCs: interconnect, top-level assembly, connectivity checking and system-level verification coordination.",
    points: ["SoC integration & assembly", "AMBA interconnect configuration", "Connectivity & lint signoff", "SoC-level verification support"],
  },
  {
    id: "embedded-services",
    code: "ENG-07",
    title: "Embedded Systems Development",
    status: "Offered",
    text: "Firmware and driver development, board bring-up support and validation firmware for silicon evaluation environments.",
    points: ["Peripheral drivers & BSP work", "RTOS-based application firmware", "Bring-up & diagnostic firmware", "Silicon validation support"],
  },
  {
    id: "consultancy",
    code: "ENG-08",
    title: "Technical Consultancy",
    status: "Offered",
    text: "Senior engineering time for architecture reviews, flow selection, capability planning and second-opinion work before major design decisions.",
    points: ["Architecture review boards", "Flow & methodology planning", "Team capability assessment", "Design review participation"],
  },
  {
    id: "corporate",
    code: "ENG-09",
    title: "Corporate Engineering Engagements",
    status: "Offered",
    text: "Structured engagements for engineering organisations: blended delivery of project support and capability building for in-house teams.",
    points: ["Dedicated engineering pods", "Custom training + delivery mix", "Graduate onboarding acceleration", "Long-term capability roadmaps"],
  },
];

export type Project = {
  slug: string;
  title: string;
  kind: string;
  note: string;
  brief: string;
  approach: string[];
  stack: string[];
  highlights: string[];
};

export const projects: Project[] = [
  {
    slug: "axi-dma-subsystem",
    title: "AXI DMA Subsystem",
    kind: "Training project · RTL + Verification",
    note: "Illustrative teaching project",
    brief:
      "A realistic data-movement subsystem built to tape-out discipline: a DMA engine with descriptor rings, AXI4 master interfaces and an APB-programmed register file.",
    approach: [
      "Micro-architecture document with channel arbitration strategy",
      "SystemVerilog RTL with parameterised channel count",
      "UVM environment with AMBA VIP-style agents",
      "Coverage-driven closure with functional holes analysis",
    ],
    stack: ["SystemVerilog", "UVM", "AXI4/APB", "Coverage & SVA"],
    highlights: [
      "Descriptor fetch → transfer → completion pipeline",
      "Error injection scenarios across interface boundaries",
      "Assertions binding protocol rules at RTL",
    ],
  },
  {
    slug: "riscv-core-verify",
    title: "RISC-V Core Verification",
    kind: "Training project · Functional Verification",
    note: "Illustrative teaching project",
    brief:
      "Verification environment for an open RISC-V core: instruction-level checking against a reference model, constrained-random instruction streams and coverage modelling of the ISA space.",
    approach: [
      "Scoreboarding against an ISS reference",
      "Directed + constrained-random instruction generation",
      "Exception, interrupt and privilege-mode scenario suites",
      "ISA coverage model with cross coverage",
    ],
    stack: ["SystemVerilog", "RISC-V ISA", "Reference-model checking", "Regression flows"],
    highlights: [
      "Hazard and forwarding corner-case tests",
      "Misaligned access and trap behaviour matrix",
      "Nightly regression with triage dashboard",
    ],
  },
  {
    slug: "block-pnr-closure",
    title: "65k-Gate Block PnR Closure",
    kind: "Training project · Physical Design",
    note: "Illustrative teaching project",
    brief:
      "Full physical implementation of a moderate-size digital block on an educational PDK: floorplanning through timing closure and physical verification, documented as a signoff-style report.",
    approach: [
      "Floorplan iterations with macro and halo strategy",
      "CTS tuning for skew targets across corners",
      "Hold/setup closure loops with ECO discipline",
      "DRC/LVS debug and final tape-out checklist",
    ],
    stack: ["PnR flow", "STA (multi-corner)", "Tcl automation", "Physical verification"],
    highlights: [
      "Timing report literacy as a core skill",
      "Congestion-driven placement decisions",
      "Before/after analysis of closure iterations",
    ],
  },
  {
    slug: "scan-insertion-lab",
    title: "Scan Insertion & ATPG Lab",
    kind: "Training project · DFT",
    note: "Illustrative teaching project",
    brief:
      "A production-style testability exercise: scan insertion on a gate-level netlist, ATPG generation, and coverage debugging to a defined stuck-at target.",
    approach: [
      "Chain architecture and stitching decisions",
      "ATPG run setup, compression and pattern count analysis",
      "Untestable-fault classification and justification",
      "Chain simulation debug methodology",
    ],
    stack: ["Scan insertion tools", "ATPG", "Gate-level simulation", "Fault grading"],
    highlights: [
      "Coverage vs pattern-count trade-off study",
      "Clock-gating and scan interaction",
      "Debug playbook for chain failures",
    ],
  },
  {
    slug: "fmcw-radar-firmware",
    title: "ToF Sensor Firmware Stack",
    kind: "Training project · Embedded",
    note: "Illustrative teaching project",
    brief:
      "Embedded firmware for a time-of-flight style sensor node: register-level driver development, DMA-based acquisition and a calibration/self-test layer designed for silicon validation use.",
    approach: [
      "Datasheet-driven register programming",
      "Interrupt + DMA double-buffer architecture",
      "Calibration state machine with diagnostics",
      "Hardware/software co-debug with logic analyser",
    ],
    stack: ["C / ARM-class MCU", "DMA & interrupts", "JTAG/SWD debug", "RTOS (optional track)"],
    highlights: [
      "Bring-up checklist methodology",
      "Error handling and recovery paths",
      "Structured validation firmware design",
    ],
  },
  {
    slug: "soc-integration-mini",
    title: "Mini-SoC Integration",
    kind: "Training project · SoC",
    note: "Illustrative teaching project",
    brief:
      "A compact SoC assembled from a processor, memory controller, UART/SPI peripherals and a custom accelerator block — top-level integration, memory map definition and system-level smoke verification.",
    approach: [
      "Memory map and address decode definition",
      "AMBA fabric configuration and integration",
      "Connectivity checking and top-level lint",
      "Firmware-driven system bring-up tests",
    ],
    stack: ["AMBA AHB/APB", "SoC integration", "Bare-metal firmware", "System simulation"],
    highlights: [
      "Integration discipline at full-chip scale",
      "Boot-to-hello-world milestone culture",
      "Register documentation as deliverable",
    ],
  },
];

export type Article = {
  slug: string;
  title: string;
  category: string;
  minutes: number;
  excerpt: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "vlsi-roadmap-2025",
    title: "The VLSI Learning Roadmap: From Zero to Industry-Ready",
    category: "Roadmap",
    minutes: 9,
    excerpt:
      "A structured, honest path through semiconductor skills — what to learn in what order, and what 'ready' actually means.",
    body: [
      "Most engineers who fail to enter the semiconductor industry do not fail on ability — they fail on sequencing. The field rewards depth in the right order: digital fundamentals, then RTL, then one deep specialisation, then breadth.",
      "Phase one is fundamentals: Boolean logic, FSMs, timing parameters, and enough CMOS intuition to understand why the rules exist. Skip this and everything downstream is memorisation.",
      "Phase two is RTL. Not 'learning Verilog' — learning to design: pipelining, handshakes, CDC, reset discipline, documentation. The deliverable of this phase is reviewed, working RTL with a testbench you wrote yourself.",
      "Phase three is specialisation: verification, physical design, DFT, or SoC integration. Choose based on temperament — verification rewards destructive curiosity, PD rewards optimisation patience, SoC rewards systems thinking.",
      "Phase four is proof: one substantial project with real deliverables — a specification, reviewed code, coverage evidence or a closure report. Interviews in this industry are evidence-driven.",
      "A realistic timeline for a student studying seriously alongside other commitments is nine to fourteen months. Shorter claims should be treated with scepticism; longer is fine if the depth is real.",
    ],
  },
  {
    slug: "rtl-vs-verification-careers",
    title: "RTL Design vs Verification: Choosing Your First VLSI Role",
    category: "Careers",
    minutes: 7,
    excerpt:
      "Two entry ramps into the industry, different temperaments, different evidence — how to pick deliberately.",
    body: [
      "RTL design and functional verification are the two most common entry points into ASIC work, and they attract genuinely different engineering temperaments.",
      "Design engineers build. Their daily work is abstraction: turning specifications into structure, then defending that structure through reviews, lint, synthesis and timing. The satisfaction is construction; the stress is ownership — every bug found downstream traces back to your code.",
      "Verification engineers investigate. Their work is systematic doubt: planning how a design could fail, building environments that try to make it fail, and proving coverage of the space. The satisfaction is the hunt; the stress is completeness — you are never done, only confident.",
      "Statistically across the industry, verification roles outnumber design roles, because verification consumes the majority of ASIC project effort. For entry candidates this often means verification has the larger door — but the better door is the one you will actually master.",
      "The evidence that lands interviews differs too. Designers need reviewed RTL with clean CDC and a working testbench. Verifiers need a coverage report they can explain line by line and a bug story they found that a directed test would have missed.",
      "If unsure, learn both at foundation level. The first specialisation is not a life sentence — senior engineers routinely cross between them.",
    ],
  },
  {
    slug: "uvm-without-the-mystery",
    title: "UVM Without the Mystery: What Actually Matters",
    category: "Tutorial",
    minutes: 11,
    excerpt:
      "Cutting through framework ceremony to the five ideas that make UVM environments work.",
    body: [
      "UVM intimidates because of volume: base classes, macros, phases, factories. Strip the ceremony away and five ideas carry almost all of the weight.",
      "Idea one: separation of stimulus, checking and infrastructure. Drivers, monitors and scoreboards exist so that when the DUT changes interfaces, you change one file — not your whole environment.",
      "Idea two: constrained-random stimulus. You declare legal scenarios with constraints; the solver explores within them; coverage tells you where the solver went. This is how one engineer stresses a design a thousand directed tests could not.",
      "Idea three: the factory. Type overriding and configuration are how reuse actually happens — a block-level environment becomes an SoC-level component without a rewrite.",
      "Idea four: sequences and layering. Complex protocols are composed from simple transactions through virtual sequences. Master layering and multi-agent stimulus stops being scary.",
      "Idea five: evidence. Assertions, coverage and regressions are not bureaucracy; they are the argument for sign-off. A UVM environment without a closure story is an expensive demo.",
      "Learn these five deeply and the rest of the methodology becomes documentation lookup. That is the actual professional skill.",
    ],
  },
  {
    slug: "timing-closure-mental-model",
    title: "Timing Closure: Building the Right Mental Model",
    category: "Tutorial",
    minutes: 8,
    excerpt:
      "Setup, hold, and the corner-case thinking that separates report-readers from closure engineers.",
    body: [
      "Every timing violation is a race. Setup violations ask: does the data arrive before the next clock edge? Hold violations ask: does the data stay stable after this one? Everything in STA is an accounting system for these two questions.",
      "Setup is fixed by removing delay: restructure logic, pipeline, upsize cells, reduce fanout, improve placement. Hold is fixed by adding delay on the fast path — and this asymmetry explains why hold is usually closed late in the flow, after clocks are real.",
      "Corners exist because silicon varies: process, voltage, temperature shift every delay. A path that is safe at typical conditions fails at worst-case voltage. Closure means passing at all signed-off corners and modes simultaneously — which is why 'it passed STA' is meaningless without naming them.",
      "The professional habit is reading reports as evidence. Which clock group? Which corner? What fraction of slack is uncertainty versus real path delay? Engineers who can decompose a violation win cycles engineers who just iterate.",
      "Practice tip: take a small design, deliberately break timing, and fix it three different ways. The muscle is diagnosis, not tool usage.",
    ],
  },
  {
    slug: "interview-prep-vlsi",
    title: "VLSI Interview Preparation: What Panels Actually Probe",
    category: "Interview prep",
    minutes: 6,
    excerpt:
      "Beyond leetcode-style lists — how semiconductor interviews really evaluate engineers.",
    body: [
      "Semiconductor interviews are evidence interviews. Panels dig into whatever you claim on your résumé until they hit bedrock — your real level of understanding.",
      "For RTL roles expect: pipeline behaviour under stalls, FSM encoding trade-offs, CDC scenarios drawn on a whiteboard, and 'walk me through your project' — followed by forty minutes of questions only the true author could answer.",
      "For verification roles expect: how you would verify a specified block, what your coverage model would contain, how constrained-random finds what directed tests miss, and the story of the hardest bug you found.",
      "For PD roles expect: setup/hold math, what you would check at each flow stage, floorplan trade-offs, and how you debug a violation that only appears at one corner.",
      "The universal differentiator is narrative control: knowing your own project deeply enough to talk about trade-offs, alternatives and mistakes. A modest project you fully own beats an impressive one you supervised.",
      "Build a one-page engineering brief for each project: architecture diagram, key decisions, hardest bug, what you would do differently. Rehearse from that, not from generic question lists.",
    ],
  },
  
];

export const workflowStages = [
  {
    code: "S.01",
    name: "Foundations",
    tag: "Weeks 0–8",
    discipline: "VLSI Core",
    skills: ["CMOS intuition", "Digital logic & FSMs", "Timing parameters", "ASIC flow literacy"],
    tools: "Open HDL simulators · waveform viewers · educational PDK flow",
    lab: "Guided RTL-to-GDSII pass of a small design with an engineering report",
    career: "Graduate engineer readiness",
  },
  {
    code: "S.02",
    name: "RTL Design",
    tag: "Weeks 8–18",
    discipline: "Design",
    skills: ["Synthesisable SystemVerilog", "Pipelines & handshakes", "CDC & reset discipline", "Micro-architecture docs"],
    tools: "Verilator-class lint/sim · waveform debug · code review",
    lab: "Multi-block RTL design through staged professional reviews",
    career: "RTL design engineer track",
  },
  {
    code: "S.03",
    name: "Verification",
    tag: "Weeks 18–30",
    discipline: "Verification",
    skills: ["Verification planning", "Constrained-random stimulus", "Coverage & assertions", "UVM architecture"],
    tools: "SV simulators · UVM 1.2 · regression & coverage analysis",
    lab: "Coverage-driven environment taken to signed-off closure",
    career: "DV / verification engineer track",
  },
  {
    code: "S.04",
    name: "Implementation",
    tag: "Weeks 30–40",
    discipline: "Physical Design / DFT",
    skills: ["Floorplan & power plan", "CTS & routing", "STA multi-corner closure", "Scan & ATPG awareness"],
    tools: "PnR & STA flows · Tcl automation · physical verification",
    lab: "Block-level closure with signoff-style reporting",
    career: "PD / DFT engineer track",
  },
  {
    code: "S.05",
    name: "Systems",
    tag: "Weeks 40–48",
    discipline: "SoC / Embedded",
    skills: ["AMBA interconnect", "IP integration", "Firmware bring-up", "System verification"],
    tools: "SoC integration flows · bare-metal toolchains · JTAG debug",
    lab: "Mini-SoC: integration, memory map, boot-to-test milestone",
    career: "SoC / embedded engineer track",
  },
  {
    code: "S.06",
    name: "Industry",
    tag: "Placement phase",
    discipline: "Career",
    skills: ["Portfolio of evidence", "Technical interview craft", "Professional communication", "Mentored delivery"],
    tools: "Review cadences · engineering briefs · interview panels",
    lab: "Internship-track project with mentor milestones",
    career: "Industry entry with defensible portfolio",
  },
];
