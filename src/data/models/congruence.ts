import type { ModelCard } from "../types";

const tex = String.raw;

export const CONGRUENCE_MODELS: ModelCard[] = [
  {
    id: "handshake",
    name: "手拉手模型",
    alias: ["共顶点等腰三角形模型", "旋转型全等"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 2,
    importance: 5,
    mnemonic: "共顶点、等腰、等顶角；左手拉左手，右手拉右手。",
    summary:
      "两个顶角相等的等腰三角形共顶角顶点，连接两组对应底角点，得到一对旋转全等三角形。",
    definition:
      "如图，$\\triangle ABC$ 中 $AB=AC$，$\\triangle ADE$ 中 $AD=AE$，且 $\\angle BAC=\\angle DAE$，两个三角形共顶点 $A$。连接 $BD$、$CE$，则 $\\triangle ABD\\cong\\triangle ACE$。这对全等可以看成把 $\\triangle ABD$ 绕点 $A$ 旋转 $\\angle BAC$ 得到 $\\triangle ACE$，所以它属于旋转型全等。",
    conditions: [
      "图中有两个等腰三角形共用同一个顶点",
      "公共顶点是两个三角形的顶角顶点（即 $AB=AC$、$AD=AE$）",
      "两个顶角相等：$\\angle BAC=\\angle DAE$",
      "结论涉及连接对应底角点的线段（$BD$、$CE$）",
      "出现“绕某点旋转”或“两个正方形、两个等边三角形共顶点”的背景",
    ],
    triggers: ["共顶点", "两边相等", "顶角相等", "等腰三角形", "旋转", "对应点连线", "等边三角形共点"],
    figure: "handshake",
    auxSteps: [
      {
        step: 1,
        title: "连接两组对应底角点",
        detail:
          "连接 $BD$ 与 $CE$。注意对应关系：$B$ 与 $C$ 是第一个等腰三角形的两底角，$D$ 与 $E$ 是第二个等腰三角形的两底角，所以是“$B$ 拉 $D$、$C$ 拉 $E$”。",
        gain: "得到 $\\triangle ABD$ 与 $\\triangle ACE$，它们有两组边相等，只差夹角",
      },
      {
        step: 2,
        title: "证明夹角相等",
        detail:
          "由 $\\angle BAC=\\angle DAE$，两边同时加上公共角 $\\angle CAD$，得 $\\angle BAD=\\angle CAE$。",
        gain: "满足 SAS，得到 $\\triangle ABD\\cong\\triangle ACE$，进而 $BD=CE$",
      },
    ],
    whyAux:
      "题目把相等的边分散在两个三角形里，直接看去没有对应关系。连接对应底角点，等于把“同一个旋转”的起点和终点连起来：$AB$ 转到 $AC$，$AD$ 转到 $AE$，于是 $BD$ 一定转到 $CE$。这样构造的目的，是把两组相等的边和相等的顶角集中到一对三角形中，用 SAS 一次证完。",
    newRelations: [
      "$\\triangle ABD\\cong\\triangle ACE$",
      "$BD=CE$，且 $BD$ 与 $CE$ 的夹角等于旋转角 $\\angle BAC$",
      "$\\angle ABD=\\angle ACE$，可以继续倒角",
      "若 $BD$ 与 $CE$ 交于 $P$，则 $\\angle BPC=\\angle BAC$",
      "以正方形、等边三角形共顶点为背景时，还可得对应线段垂直或成特殊角",
    ],
    theorems: [
      "全等三角形判定：SAS（两边及其夹角）",
      "旋转的性质：旋转前后图形全等，对应线段夹角等于旋转角",
      "三角形内角和定理（用于倒角）",
      "等腰三角形的两腰相等",
    ],
    proof: {
      goal: "求证 $BD=CE$，并求 $BD$ 与 $CE$ 的夹角。",
      steps: [
        {
          s: "$AB=AC$，$AD=AE$",
          r: "已知两个等腰三角形",
        },
        {
          s: "$\\angle BAD=\\angle BAC+\\angle CAD$，$\\angle CAE=\\angle CAD+\\angle DAE$",
          r: "角的和差，注意 $\\angle BAC=\\angle DAE$",
        },
        {
          s: "$\\angle BAD=\\angle CAE$",
          r: "等量代换（同加公共角 $\\angle CAD$）",
        },
        {
          s: "$\\triangle ABD\\cong\\triangle ACE$",
          r: "SAS：$AB=AC$，$\\angle BAD=\\angle CAE$，$AD=AE$",
        },
        {
          s: "$BD=CE$，$\\angle ABD=\\angle ACE$",
          r: "全等三角形的对应边相等、对应角相等",
        },
        {
          s: "设 $BD$ 与 $CE$ 交于 $P$，则 $\\angle BPC=180^\\circ-\\angle PBC-\\angle PCB=180^\\circ-\\angle ABC-\\angle ACB=\\angle BAC$",
          r: "三角形内角和；其中 $\\angle PBC=\\angle ABC-\\angle ABD$，$\\angle PCB=\\angle BCA+\\angle ACE$，再用 $\\angle ABD=\\angle ACE$ 化简",
        },
      ],
      note:
        "若两个等腰三角形的顶角不相等，则不能得到全等，只能得到“旋转相似”。判断手拉手的关键不是“有两个等腰三角形”，而是“公共顶点是顶角顶点且顶角相等”。",
    },
    example: {
      problem:
        "如图，$B$、$C$、$D$ 三点共线，$\\triangle ABC$ 与 $\\triangle CDE$ 都是等边三角形，连接 $AD$、$BE$。求证：$AD=BE$。",
      given: "$B$、$C$、$D$ 共线；$\\triangle ABC$、$\\triangle CDE$ 为等边三角形。",
      steps: [
        {
          s: "$CA=CB$，$CD=CE$，$\\angle ACB=\\angle DCE=60^\\circ$",
          r: "等边三角形的性质",
        },
        {
          s: "$\\angle ACD=180^\\circ-60^\\circ=120^\\circ$，$\\angle BCE=180^\\circ-60^\\circ=120^\\circ$",
          r: "$B$、$C$、$D$ 共线，平角减去 $60^\\circ$",
        },
        {
          s: "$\\angle ACD=\\angle BCE$",
          r: "等量代换",
        },
        {
          s: "$\\triangle ACD\\cong\\triangle BCE$",
          r: "SAS：$CA=CB$，$\\angle ACD=\\angle BCE$，$CD=CE$",
        },
        {
          s: "$AD=BE$",
          r: "全等三角形对应边相等",
        },
      ],
      conclusion:
        "两个等边三角形共顶点时，只要找准“对应底角点”，就能用 SAS 得到旋转全等。本题中 $C$ 是公共顶点，$A\\leftrightarrow B$、$D\\leftrightarrow E$，所以 $AD$ 与 $BE$ 是对应边。",
    },
    variants: [
      { title: "等腰直角三角形手拉手", desc: "把等边三角形换成等腰直角三角形：$CA=CB$，$CD=CE$，$\\angle ACB=\\angle DCE=90^\\circ$，则 $AD=BE$ 且 $AD\\perp BE$。" },
      { title: "两个正方形共顶点", desc: "正方形 $ABCD$、$CEFG$ 共顶点 $C$，连接 $BG$、$DE$，则 $BG=DE$ 且 $BG\\perp DE$，本质是旋转 $90^\\circ$ 的手拉手。" },
      { title: "手拉手求角度", desc: "已知 $BD$ 与 $CE$ 的交点为 $P$，求 $\\angle BPC$：先证全等，再用“$8$ 字型”或三角形内角和把角集中到 $\\triangle ABC$。" },
      { title: "脚拉脚、背靠背对照", desc: "公共顶点变成底角顶点（脚拉脚）或两个三角形共用底边位于两侧（背靠背），辅助线与结论都会改变，不能混用。" },
    ],
    pitfalls: [
      "公共顶点必须是两个等腰三角形的顶角顶点；如果公共顶点是底角顶点，那是“脚拉脚”，不能套手拉手。",
      "连接对应点时必须“左拉左、右拉右”，连成 $BE$、$CD$ 一般得不到全等。",
      "顶角相等这一条件不能漏；只有两组边相等时，SSA 不能判定全等。",
      "用旋转解释时，旋转中心是公共顶点，旋转角是公共顶角，不要写成 $\\angle BAD$。",
    ],
    related: ["rotation-congruence", "special-angle-rotate", "foot-foot", "equilateral-build"],
    tags: ["全等", "旋转", "共顶点", "SAS", "高频"],
  },
  {
    id: "foot-foot",
    name: "脚拉脚模型",
    alias: ["共底边等腰模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 1,
    importance: 3,
    mnemonic: "两等腰、共底边；连两顶角，垂直平分底边。",
    summary:
      "两个等腰三角形共用一条底边，连接两个顶角，得到一对全等三角形，并且连线垂直平分公共底边。",
    definition:
      "如图，$CA=CB$，$DA=DB$，即 $\\triangle ABC$ 与 $\\triangle ABD$ 都是等腰三角形，公共底边为 $AB$。连接两顶角 $C$、$D$，则 $\\triangle ACD\\cong\\triangle BCD$，且直线 $CD$ 垂直平分 $AB$。不同资料对“脚拉脚”的叫法略有差异，本卡片采用“两个等腰三角形共底边”的标准构型；它的本质是“到线段两端距离相等的点在线段的垂直平分线上”。",
    conditions: [
      "出现两个三角形共用同一条底边，且两组腰分别相等",
      "已知一点到一条线段两端距离相等",
      "要证一条直线垂直平分某条线段",
      "要证一个点在某条线段的垂直平分线上",
    ],
    triggers: ["共底边", "$CA=CB$", "$DA=DB$", "到两端距离相等", "两个等腰三角形", "垂直平分线"],
    figure: "foot-foot",
    auxSteps: [
      {
        step: 1,
        title: "连接两个顶角",
        detail: "连接 $CD$，设 $CD$ 与 $AB$ 交于点 $M$。",
        gain: "把分散的两个等腰三角形组成一对全等三角形 $\\triangle ACD$ 与 $\\triangle BCD$",
      },
      {
        step: 2,
        title: "标记交点与直角",
        detail: "由全等得 $\\angle ACD=\\angle BCD$，再在等腰 $\\triangle CAB$ 中用三线合一，得 $CM\\perp AB$ 且 $M$ 是 $AB$ 中点。",
        gain: "得到 $CD$ 垂直平分 $AB$，同时 $CD$ 平分 $\\angle ACB$ 与 $\\angle ADB$",
      },
    ],
    whyAux:
      "两个等腰三角形各自只能提供“两条腰相等”，把它们连起来才出现公共边 $CD$。$CD$ 是两对相等线段的“桥梁”，于是可用 SSS 得到全等；全等又给出角平分线，再用等腰三角形三线合一得到垂直与中点。辅助线的目的就是制造一条公共边，把两组分散的相等关系接到一起。",
    newRelations: [
      "$\\triangle ACD\\cong\\triangle BCD$（SSS）",
      "$\\angle ACD=\\angle BCD$，$\\angle ADC=\\angle BDC$",
      "$CD$ 垂直平分 $AB$",
      "$C$、$D$ 都在 $AB$ 的垂直平分线上",
      "当两个三角形都是等边三角形时，退化为“背靠背”菱形模型",
    ],
    theorems: [
      "全等三角形判定：SSS",
      "等腰三角形“三线合一”",
      "线段垂直平分线的性质与判定",
      "全等三角形对应角相等",
    ],
    proof: {
      goal: "已知 $CA=CB$，$DA=DB$，求证 $CD$ 垂直平分 $AB$。",
      steps: [
        { s: "$CA=CB$，$DA=DB$，$CD=CD$", r: "已知与公共边" },
        { s: "$\\triangle ACD\\cong\\triangle BCD$", r: "SSS" },
        { s: "$\\angle ACD=\\angle BCD$", r: "全等三角形对应角相等" },
        { s: "$CD\\perp AB$，且 $CD$ 平分 $AB$", r: "等腰 $\\triangle CAB$ 中，顶角平分线、底边中线、底边高互相重合（三线合一）" },
      ],
      note: "也可以不连 $CD$，直接引用“到线段两端距离相等的点在线段的垂直平分线上”，但考试中写出全等过程更稳妥。",
    },
    example: {
      problem:
        "如图，$CA=CB$，$DA=DB$，$\\angle ACB=40^\\circ$，$\\angle ADB=100^\\circ$。求 $\\angle CAD$ 与 $\\angle CBD$ 的度数。",
      given: "两个等腰三角形共底边 $AB$。",
      steps: [
        { s: "$\\angle CAB=\\angle CBA=(180^\\circ-40^\\circ)\\div2=70^\\circ$", r: "等腰三角形两底角相等" },
        { s: "$\\angle DAB=\\angle DBA=(180^\\circ-100^\\circ)\\div2=40^\\circ$", r: "等腰三角形两底角相等" },
        { s: "$\\angle CAD=\\angle CAB+\\angle DAB=110^\\circ$", r: "角的和（$C$、$D$ 在 $AB$ 两侧）" },
        { s: "$\\angle CBD=\\angle CBA+\\angle DBA=110^\\circ$", r: "角的和" },
        { s: "$\\angle CAD=\\angle CBD$", r: "等量代换；这也与 $\\triangle ACD\\cong\\triangle BCD$ 的对应角一致" },
      ],
      conclusion:
        "$\\angle CAD=\\angle CBD=110^\\circ$。注意：当 $C$、$D$ 在 $AB$ 同侧时，角的和差关系会改变，要按图形重新计算。",
    },
    variants: [
      { title: "等腰三角形 + 形外一点", desc: "已知 $AB=AC$，$D$ 是形外一点且 $DB=DC$，则 $AD$ 垂直平分 $BC$，且 $AD$ 平分 $\\angle BAC$。" },
      { title: "两个等边三角形共边", desc: "若 $CA=CB=AB$ 且 $DA=DB=AB$，两个等边三角形共边 $AB$，退化为“背靠背”菱形模型。" },
      { title: "同侧与异侧", desc: "两顶角在公共底边同侧或异侧，全等关系都不变，但夹角与角度的和差需要按位置讨论。" },
      { title: "垂直平分线的判定", desc: "把“两个点都到 $A$、$B$ 距离相等”直接翻译成“两点连线垂直平分 $AB$”。" },
    ],
    pitfalls: [
      "混淆公共顶点：本模型公共的是底边，公共顶点不是顶角顶点。",
      "由 $CA=CB$、$DA=DB$ 直接写“$CD$ 平分 $\\angle ACB$”而不说明全等或三线合一的依据。",
      "忽略 $C$、$D$ 在 $AB$ 同侧还是异侧，导致角的和差写错。",
      "把“垂直平分”写成“垂直”，漏掉平分。",
    ],
    related: ["back-to-back", "double-segment", "axis-basic", "bisector-isosceles"],
    tags: ["全等", "等腰", "垂直平分线", "SSS"],
  },
  {
    id: "back-to-back",
    name: "背靠背模型",
    alias: ["共边等边三角形模型"],
    categories: ["congruence"],
    grade: "八年级上",
    difficulty: 2,
    importance: 3,
    mnemonic: "两个等边共一边，背靠背站；连对角线，菱形加直角。",
    summary:
      "两个等边三角形共用一条边并分居两侧，得到菱形 $ACBD$，对角线互相垂直平分，且 $\\angle CAD=\\angle CBD=120^\\circ$。",
    definition:
      "如图，$\\triangle ABC$ 与 $\\triangle ABD$ 都是等边三角形，共用边 $AB$，且 $C$、$D$ 在 $AB$ 两侧。则四边形 $ACBD$ 的四条边相等，是菱形；对角线 $AB$ 与 $CD$ 互相垂直平分；$\\angle CAD=\\angle CBD=120^\\circ$，$\\angle ACB=\\angle ADB=60^\\circ$。",
    conditions: [
      "两个等边三角形共用一条边",
      "出现“在 $AB$ 两侧分别作等边三角形”的作图语言",
      "要证四边形是菱形或对角线垂直",
      "要求 $120^\\circ$、$60^\\circ$ 等特殊角",
    ],
    triggers: ["共边", "两个等边三角形", "菱形", "对角线垂直", "$120^\\circ$", "背靠背"],
    figure: "back-to-back",
    auxSteps: [
      {
        step: 1,
        title: "连接另一条对角线",
        detail: "连接 $CD$，设 $AB$ 与 $CD$ 交于点 $M$。",
        gain: "把两个等边三角形组合成菱形 $ACBD$，出现对角线 $CD$",
      },
      {
        step: 2,
        title: "标出直角与中点",
        detail: "由 $CA=CB$、$DA=DB$，用脚拉脚模型得 $CD$ 垂直平分 $AB$。",
        gain: "得到 $AM=BM$、$CM\\perp AB$、$DM\\perp AB$，从而 $A$、$M$、$B$ 与 $C$、$M$、$D$ 的垂直关系",
      },
    ],
    whyAux:
      "两个等边三角形各自的信息是“三边相等、三个 $60^\\circ$”。连 $CD$ 后，两个三角形共用底边，且两个顶角到 $A$、$B$ 的距离都相等，正好构成脚拉脚模型，于是 $CD$ 是 $AB$ 的垂直平分线。辅助线把两个 $60^\\circ$ 拼成一个 $120^\\circ$，也把菱形补完整。",
    newRelations: [
      "$AC=CB=BD=DA$，四边形 $ACBD$ 是菱形",
      "$AB\\perp CD$，且 $AB$ 与 $CD$ 互相平分",
      "$\\angle CAD=\\angle CBD=120^\\circ$",
      "$CD=2CM=\\sqrt{3}\\,AB$（因为等边三角形的高为 $\\frac{\\sqrt{3}}{2}AB$）",
      "$\\angle ACB=\\angle ADB=60^\\circ$",
    ],
    theorems: [
      "等边三角形三边相等、三个角都是 $60^\\circ$",
      "菱形判定：四条边相等的四边形是菱形",
      "菱形对角线互相垂直平分",
      "等腰三角形三线合一",
    ],
    proof: {
      goal: "两个等边三角形共边 $AB$，求证 $ACBD$ 是菱形，且 $\\angle CAD=120^\\circ$、$CD=\\sqrt{3}AB$。",
      steps: [
        { s: "$AC=CB=AB$，$AD=DB=AB$", r: "两个三角形都是等边三角形" },
        { s: "$AC=CB=BD=DA$", r: "等量代换，都等于 $AB$" },
        { s: "四边形 $ACBD$ 是菱形", r: "四条边相等的四边形是菱形" },
        { s: "$AB\\perp CD$ 且 $AB$、$CD$ 互相平分", r: "菱形对角线互相垂直平分" },
        { s: "$\\angle CAB=60^\\circ$，$\\angle DAB=60^\\circ$，且 $C$、$D$ 在 $AB$ 两侧", r: "等边三角形内角为 $60^\\circ$" },
        { s: "$\\angle CAD=60^\\circ+60^\\circ=120^\\circ$", r: "角的和" },
        { s: "$CM=DM=\\frac{\\sqrt{3}}{2}AB$，$CD=CM+DM=\\sqrt{3}AB$", r: "等边三角形的高；$M$ 为 $AB$ 中点" },
      ],
      note: "若 $C$、$D$ 在 $AB$ 同侧，两个等边三角形会重合或错开，不能得到菱形与 $120^\\circ$。题目中“两侧”的位置条件必须写出来。",
    },
    example: {
      problem: "两个等边三角形 $ABC$、$ABD$ 共用边 $AB$，$C$、$D$ 在 $AB$ 两侧，$AB=2$。求 $CD$ 的长与 $\\angle CAD$ 的度数。",
      given: "共边 $AB=2$，两个等边三角形分居两侧。",
      steps: [
        { s: "$AC=CB=BD=DA=2$", r: "等边三角形三边相等" },
        { s: "四边形 $ACBD$ 是菱形", r: "四边相等" },
        { s: "设 $AB$ 与 $CD$ 交于 $M$，则 $M$ 是 $AB$ 中点，$AM=1$", r: "菱形对角线互相平分" },
        { s: "$CM=\\sqrt{AC^2-AM^2}=\\sqrt{4-1}=\\sqrt{3}$", r: "勾股定理；同理 $DM=\\sqrt{3}$" },
        { s: "$CD=CM+DM=2\\sqrt{3}$", r: "线段相加；也符合 $CD=\\sqrt{3}\\,AB$" },
        { s: "$\\angle CAD=120^\\circ$", r: "两个 $60^\\circ$ 角的和" },
      ],
      conclusion: "$CD=2\\sqrt{3}$，$\\angle CAD=120^\\circ$。",
    },
    variants: [
      { title: "等腰直角背靠背", desc: "两个等腰直角三角形共用斜边，分居两侧，得到正方形，对角线相等且互相垂直平分。" },
      { title: "共腰背靠背", desc: "两个等边三角形共用一条腰，也形成特殊角关系，但需要重新画图分析，不能照搬 $\\sqrt{3}AB$。" },
      { title: "求面积", desc: "菱形 $ACBD$ 的面积 $=\\frac{1}{2}\\cdot AB\\cdot CD=\\frac{\\sqrt{3}}{2}AB^2$，可用于求重叠图形面积。" },
      { title: "与脚拉脚联动", desc: "背靠背是脚拉脚中 $CA=CB=DA=DB=AB$ 的特例，先证菱形再用菱形性质。" },
    ],
    pitfalls: [
      "漏掉“$C$、$D$ 在 $AB$ 两侧”这一位置条件，或默认两侧。",
      "把菱形写成 $ABCD$：四边形顶点顺序应为 $A$、$C$、$B$、$D$。",
      "误以为 $CD=AB$；实际 $CD=\\sqrt{3}AB$。",
      "用菱形对角线性质时不先证明四边形是菱形。",
    ],
    related: ["foot-foot", "equilateral-build", "iso-right-build", "axis-basic"],
    tags: ["等边三角形", "菱形", "垂直", "特殊角"],
  },
];
