import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TableSortLabel,
    TablePagination,
    TextField,
    InputAdornment,
    useTheme,
    Button,
} from "@mui/material";
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    Search as SearchIcon,

    LocalShipping as LocalShippingIcon,
} from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";

const cardData = [
    {
        id: 1,
        title: "Available Vehicle",
        value: "0",
        duration: "NaN% (30 Days)",
        icon: <LocalShippingIcon fontSize="large" />,
    },
    {
        id: 2,
        title: "Totle Vehicle ",
        value: "0",
        duration: "NaN% (30 Days)",
        icon: <LocalShippingIcon fontSize="large" />,
    },
    {
        id: 3,
        title: "Deacive Vehicle",
        value: "0",
        duration: "(30 Days)",
        icon: <LocalShippingIcon fontSize="large" />,
    },
    {
        id: 4,
        title: "Blacklisted Vehicle",
        value: "0",
        duration: "(30 Days)",
        icon: <LocalShippingIcon fontSize="large" />,
    },
];

const createData = (id, adminId, name, contact) => ({
    id,
    adminId,
    name,
    contact,
});

const rows = [];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilized = array.map((el, index) => [el, index]);
    stabilized.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        return order !== 0 ? order : a[1] - b[1];
    });
    return stabilized.map((el) => el[0]);
}

const headCells = [
    { id: "sno", label: "S.No", sortable: false },
    { id: "vehicleid", label: "Vehicle ID", sortable: true },
    { id: "location", label: "Location", sortable: true },
    { id: "ownername", label: "Owner Name", sortable: true },
    { id: "vehiclemodel", label: "Vehicle Model", sortable: false },
    { id: "action", label: "Action", sortable: false },
];

const VehicleCard = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const cardColor = "#0155a5";
    const cardLightColor = "#e6f0fa";
    const [activeCard, setActiveCard] = useState(null);
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("name");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");

    const handleAdd = () => {
        navigate("/vehicleform");
    };

    const handleCardClick = (cardId) => {
        setActiveCard(activeCard === cardId ? null : cardId);
    };

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const filteredRows = rows.filter(
        (row) =>
            row.adminId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            row.contact.includes(searchTerm)
    );

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

    return (
        <Box sx={{ p: 2 }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: 2,
                    mb: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Manage Vehicle
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleAdd}
                    sx={{ textTransform: "none", fontWeight: 500 }}
                >
                    Add Vehicle
                </Button>
            </Box>

            {/* Dashboard Cards */}
            <Grid
                container
                spacing={2}
                sx={{ flexWrap: "nowrap", overflowX: "auto", mb: 4 }}
            >
                {cardData.map((card) => (
                    <Grid
                        item
                        key={card.id}
                        sx={{ minWidth: 220, flex: 1, display: "flex", borderRadius: 2 }}
                    >
                        <Card
                            onClick={() => handleCardClick(card.id)}
                            sx={{
                                flex: 1,
                                cursor: "pointer",
                                border:
                                    activeCard === card.id
                                        ? `2px solid ${cardColor}`
                                        : "2px solid transparent",
                                backgroundColor:
                                    activeCard === card.id ? cardLightColor : "background.paper",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: theme.shadows[6],
                                    backgroundColor: cardLightColor,
                                    "& .icon-container": {
                                        backgroundColor: cardColor,
                                        color: "#fff",
                                    },
                                },
                            }}
                        >
                            <CardContent
                                sx={{ display: "flex", alignItems: "center", gap: 2 }}
                            >
                                <Box
                                    className="icon-container"
                                    sx={{
                                        p: 1.5,
                                        borderRadius: "50%",
                                        backgroundColor:
                                            activeCard === card.id ? cardColor : cardLightColor,
                                        color: activeCard === card.id ? "#fff" : cardColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0,
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {React.cloneElement(card.icon, { color: "inherit" })}
                                </Box>
                                <Stack spacing={0.5}>
                                    <Typography
                                        variant="h5"
                                        fontWeight="bold"
                                        color={activeCard === card.id ? "primary" : "text.primary"}
                                    >
                                        {card.value}
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        color={activeCard === card.id ? "primary" : "text.primary"}
                                    >
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {card.subtitle}
                                    </Typography>
                                    <Typography variant="caption" color="text.disabled">
                                        {card.duration}
                                    </Typography>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Admin Table */}
            <Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search..."
                        onChange={handleSearch}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
                    <Table>
                        <TableHead sx={{ backgroundColor: "#1565c0" }}>
                            <TableRow>
                                {headCells.map((headCell) => (
                                    <TableCell
                                        key={headCell.id}
                                        sx={{ fontWeight: "bold" }}
                                        sortDirection={orderBy === headCell.id ? order : false}
                                    >
                                        {headCell.sortable ? (
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction={orderBy === headCell.id ? order : "asc"}
                                                onClick={() => handleRequestSort(headCell.id)}
                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        ) : (
                                            headCell.label
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(filteredRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => (
                                    <TableRow key={row.id} hover>
                                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                                        <TableCell>{row.adminId}</TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.contact}</TableCell>
                                        <TableCell>
                                            <Box sx={{ display: "flex", gap: 1 }}>
                                                <IconButton size="small" color="primary">
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="error">
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton size="small" color="default">
                                                    <MoreVertIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={5} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredRows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Box>
    );
};

export default VehicleCard;
