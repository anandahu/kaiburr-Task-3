"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Spin,
  Modal,
  message,
  Tag,
  Space,
  Input,
  Card,
  Avatar,
  Tooltip,
  Popconfirm,
  Empty,
  Segmented,
  Drawer,
  Divider,
} from "antd"
import type { TableProps } from "antd"
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  PlayCircleOutlined,
  HistoryOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"
import CreateTaskForm from "./CreateTaskForm"
import type { Task, TaskExecution } from "../services/api"
import { getAllTasks, deleteTask, executeTask, searchTasksByName } from "../services/api"

/* ---------- Helper Functions ---------- */

const getStatusIcon = (exec?: TaskExecution) => {
  if (!exec) return <ClockCircleOutlined style={{ color: "#999" }} />
  if (!exec.endTime) return <ClockCircleOutlined style={{ color: "#faad14" }} />
  const out = exec.output || ""
  if (/error/i.test(out)) return <CloseCircleOutlined style={{ color: "#ff4d4f" }} />
  return <CheckCircleOutlined style={{ color: "#52c41a" }} />
}

const getStatusTag = (exec?: TaskExecution) => {
  if (!exec) return <Tag>Idle</Tag>
  if (!exec.endTime) return <Tag color="warning">Running</Tag>
  const out = exec.output || ""
  if (/error/i.test(out)) return <Tag color="error">Failed</Tag>
  return <Tag color="success">Success</Tag>
}

const formatCommand = (cmd = "") => (cmd.length > 50 ? cmd.slice(0, 47) + "..." : cmd)

const formatDate = (dateString?: string) => {
  if (!dateString) return "—"
  return new Date(dateString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

/* ---------- Main Component ---------- */

const TaskList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isHistoryDrawerVisible, setIsHistoryDrawerVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [executingTaskId, setExecutingTaskId] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    setSearchTerm("")
    setLoading(true)
    setError(null)
    try {
      const data = await getAllTasks()
      setTasks(data)
    } catch (err) {
      setError("Failed to fetch tasks.")
      message.error("Failed to load tasks. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (value: string) => {
    setSearchTerm(value)
    if (!value.trim()) {
      fetchTasks()
      return
    }
    setLoading(true)
    setError(null)
    try {
      const results = await searchTasksByName(value)
      setTasks(results)
      if (results.length === 0) {
        message.info(`No tasks found matching "${value}"`)
      }
    } catch (err) {
      setError(`Failed to search tasks for "${value}".`)
      message.error("Search failed. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteTask(id)
      message.success("Task deleted successfully!")
      await fetchTasks()
    } catch (err) {
      console.error("Delete error:", err)
      message.error("Failed to delete task.")
    } finally {
      setDeletingId(null)
    }
  }

  const handleExecute = async (id: string) => {
    setExecutingTaskId(id)
    try {
      await executeTask(id)
      message.success("Execution started. Refreshing...")
      setTimeout(fetchTasks, 800)
    } catch (err) {
      console.error("Execution error:", err)
      message.error("Failed to execute task.")
    } finally {
      setExecutingTaskId(null)
    }
  }

  const showHistoryDrawer = (task: Task) => {
    setSelectedTask(task)
    setIsHistoryDrawerVisible(true)
  }

  const closeHistoryDrawer = () => {
    setIsHistoryDrawerVisible(false)
    setSelectedTask(null)
  }

  const showCreateModal = () => setIsCreateModalVisible(true)
  const handleCreateModalCancel = () => setIsCreateModalVisible(false)
  const handleFormSubmitted = () => {
    setIsCreateModalVisible(false)
    fetchTasks()
  }

  const getFilteredTasks = () => {
    if (filterStatus === "all") return tasks
    return tasks.filter((task) => {
      const lastExec = task.taskExecutions?.slice(-1)[0]
      if (filterStatus === "idle") return !lastExec
      if (filterStatus === "running") return lastExec && !lastExec.endTime
      if (filterStatus === "success") {
        return lastExec && lastExec.endTime && !/error/i.test(lastExec.output || "")
      }
      if (filterStatus === "failed") {
        return lastExec && lastExec.endTime && /error/i.test(lastExec.output || "")
      }
      return true
    })
  }

  const filteredTasks = getFilteredTasks()
  const totalTasks = tasks.length
  const activeTasks = tasks.filter((t) => t.taskExecutions && t.taskExecutions.length > 0).length
  const failedTasks = tasks.filter((t) => {
    const lastExec = t.taskExecutions?.slice(-1)[0]
    return lastExec && lastExec.endTime && /error/i.test(lastExec.output || "")
  }).length

  /* ---------- Table Columns ---------- */
  const columns: TableProps<Task>["columns"] = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
      width: "30%",
      render: (_value: unknown, record: Task) => {
        const initials = record.name?.trim()?.slice(0, 1).toUpperCase() || "?"
        const lastExec = record.taskExecutions?.slice(-1)[0]
        return (
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar
              style={{
                backgroundColor: "#1890ff",
                flexShrink: 0,
              }}
            >
              {initials}
            </Avatar>
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {record.name}
              </div>
              <div
                style={{
                  color: "#999",
                  fontSize: 12,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={record.command}
              >
                {formatCommand(record.command || "")}
              </div>
            </div>
            <div style={{ marginLeft: "auto", flexShrink: 0 }}>{getStatusIcon(lastExec)}</div>
          </div>
        )
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      width: "15%",
      render: (owner: string) => <span style={{ fontSize: 13 }}>{owner || "Unknown"}</span>,
      sorter: (a, b) => a.owner.localeCompare(b.owner),
    },
    {
      title: "Status",
      key: "status",
      width: "15%",
      render: (_value: unknown, record: Task) => {
        const lastExec = record.taskExecutions?.slice(-1)[0]
        return getStatusTag(lastExec)
      },
    },
    {
      title: "Last Run",
      key: "lastRun",
      width: "20%",
      render: (_value: unknown, record: Task) => {
        const lastExec = record.taskExecutions?.slice(-1)[0]
        return <span style={{ fontSize: 13, color: "#666" }}>{lastExec ? formatDate(lastExec.startTime) : "—"}</span>
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (_value: unknown, record: Task) => (
        <Space size="small" wrap>
          <Tooltip title="Execute task">
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              onClick={() => handleExecute(record.id)}
              loading={executingTaskId === record.id}
            >
              Run
            </Button>
          </Tooltip>
          <Tooltip title="View history">
            <Button size="small" icon={<HistoryOutlined />} onClick={() => showHistoryDrawer(record)}>
              History
            </Button>
          </Tooltip>
          <Tooltip title="Delete task">
            <Popconfirm
              title="Delete Task"
              description="Are you sure you want to delete this task?"
              onConfirm={() => handleDelete(record.id)}
              okText="Delete"
              cancelText="Cancel"
              okButtonProps={{ danger: true }}
            >
              <Button danger size="small" icon={<DeleteOutlined />} loading={deletingId === record.id} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ]

  if (loading && tasks.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Spin size="large" tip="Loading tasks..." />
      </div>
    )
  }

  /* ---------- Main Render ---------- */
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#fff",
          borderBottom: "1px solid #f0f0f0",
          padding: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: "0 0 8px 0", fontSize: 28, fontWeight: 700 }}>Tasks</h1>
            <p style={{ margin: 0, color: "#666", fontSize: 14 }}>Manage and execute your scheduled tasks</p>
          </div>
          <Space>
            <Tooltip title="Refresh task list">
              <Button icon={<ReloadOutlined />} onClick={fetchTasks} loading={loading}>
                Refresh
              </Button>
            </Tooltip>
            <Button type="primary" icon={<PlusOutlined />} onClick={showCreateModal}>
              Create Task
            </Button>
          </Space>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "0 24px 24px 24px" }}>
        {/* Stats Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <Card
            size="small"
            style={{
              borderRadius: 8,
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>Total Tasks</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#1890ff" }}>{totalTasks}</div>
            </div>
          </Card>
          <Card
            size="small"
            style={{
              borderRadius: 8,
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>Active</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#52c41a" }}>{activeTasks}</div>
            </div>
          </Card>
          <Card
            size="small"
            style={{
              borderRadius: 8,
              border: "1px solid #f0f0f0",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>Failed</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "#ff4d4f" }}>{failedTasks}</div>
            </div>
          </Card>
        </div>

        {/* Search and Filter Section */}
        <Card
          size="small"
          style={{
            marginBottom: 24,
            borderRadius: 8,
            border: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Input.Search
              placeholder="Search tasks by name..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ flex: 1, minWidth: 250 }}
              onSearch={handleSearch}
              loading={loading && !!searchTerm}
              size="large"
            />
            <Segmented
              value={filterStatus}
              onChange={(value) => setFilterStatus(value as string)}
              options={[
                { label: "All", value: "all" },
                { label: "Idle", value: "idle" },
                { label: "Running", value: "running" },
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
              ]}
            />
          </div>
        </Card>

        {/* Tasks Table */}
        {filteredTasks.length === 0 ? (
          <Card
            style={{
              borderRadius: 8,
              border: "1px solid #f0f0f0",
              textAlign: "center",
            }}
          >
            <Empty
              description={searchTerm ? `No tasks found matching "${searchTerm}"` : "No tasks yet"}
              style={{ marginTop: 40, marginBottom: 40 }}
            >
              {!searchTerm && (
                <Button type="primary" onClick={showCreateModal}>
                  Create Your First Task
                </Button>
              )}
            </Empty>
          </Card>
        ) : (
          <Card
            size="small"
            style={{
              borderRadius: 8,
              border: "1px solid #f0f0f0",
              overflow: "hidden",
            }}
            bodyStyle={{ padding: 0 }}
          >
            <Table
              columns={columns}
              dataSource={filteredTasks}
              rowKey="id"
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showTotal: (total) => `Total ${total} tasks`,
              }}
              loading={loading}
              bordered={false}
              size="middle"
              style={{ fontSize: 13 }}
            />
          </Card>
        )}
      </div>

      {/* History Drawer */}
      <Drawer
        title={
          <div>
            <span>Execution History</span>
            {selectedTask && <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>{selectedTask.name}</div>}
          </div>
        }
        placement="right"
        onClose={closeHistoryDrawer}
        open={isHistoryDrawerVisible}
        width={500}
      >
        {selectedTask && selectedTask.taskExecutions ? (
          selectedTask.taskExecutions.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {selectedTask.taskExecutions
                .slice()
                .reverse()
                .map((exec, idx) => (
                  <Card
                    key={idx}
                    size="small"
                    style={{
                      borderRadius: 6,
                      border: "1px solid #f0f0f0",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: 12,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 13 }}>{formatDate(exec.startTime)}</div>
                        <div style={{ fontSize: 12, color: "#999" }}>
                          {exec.endTime
                            ? `Duration: ${Math.round((new Date(exec.endTime).getTime() - new Date(exec.startTime || "").getTime()) / 1000)}s`
                            : "Still running..."}
                        </div>
                      </div>
                      <div>{getStatusTag(exec)}</div>
                    </div>
                    <Divider style={{ margin: "12px 0" }} />
                    <pre
                      style={{
                        backgroundColor: "#f5f5f5",
                        padding: 12,
                        borderRadius: 4,
                        fontSize: 12,
                        overflow: "auto",
                        maxHeight: 300,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        margin: 0,
                      }}
                    >
                      {exec.output || "(No output)"}
                    </pre>
                  </Card>
                ))}
            </div>
          ) : (
            <Empty description="No execution history" />
          )
        ) : null}
      </Drawer>

      {/* Create Task Modal */}
      <Modal
        title="Create New Task"
        open={isCreateModalVisible}
        onCancel={handleCreateModalCancel}
        footer={null}
        destroyOnClose
        width={600}
      >
        <CreateTaskForm onFormSubmit={handleFormSubmitted} onCancel={handleCreateModalCancel} />
      </Modal>

      {/* Error State */}
      {error && (
        <div
          style={{
            position: "fixed",
            bottom: 24,
            left: 24,
            right: 24,
            backgroundColor: "#fff2f0",
            border: "1px solid #ffccc7",
            borderRadius: 8,
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <span style={{ color: "#ff4d4f", fontSize: 13 }}>{error}</span>
          <Button size="small" onClick={fetchTasks}>
            Retry
          </Button>
        </div>
      )}
    </div>
  )
}

export default TaskList
