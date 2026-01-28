import { DollarSign, Package, ShoppingCart, Users, TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminLayout } from './AdminLayout';
import { mockProducts, mockOrders } from '@/data/mockData';
import { Link } from 'react-router-dom';

const stats = [
  {
    title: 'Total Revenue',
    value: '$12,438',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Orders',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
  },
  {
    title: 'Products',
    value: mockProducts.length.toString(),
    change: '+3',
    trend: 'up',
    icon: Package,
  },
  {
    title: 'Customers',
    value: '1,234',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
  },
];

const recentOrders = mockOrders.slice(0, 5);

const lowStockProducts = mockProducts.filter(p => p.inventory < 20).slice(0, 5);

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your store performance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-sm">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="mr-1 h-4 w-4 text-success" />
                  ) : (
                    <TrendingDown className="mr-1 h-4 w-4 text-destructive" />
                  )}
                  <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                    {stat.change}
                  </span>
                  <span className="ml-1 text-muted-foreground">from last month</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/orders">
                  View All
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} items • ${order.total.toFixed(2)}
                      </p>
                    </div>
                    <Badge
                      className={
                        order.status === 'delivered'
                          ? 'badge-success'
                          : order.status === 'shipped'
                          ? 'badge-success'
                          : 'badge-warning'
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Low Stock Alert */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Low Stock Alert</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/admin/products">
                  Manage Inventory
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-muted">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                    <Badge variant={product.inventory < 10 ? 'destructive' : 'secondary'}>
                      {product.inventory} left
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/admin/products">Add New Product</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/admin/orders">Process Orders</Link>
            </Button>
            <Button variant="outline">Export Reports</Button>
            <Button variant="outline">View Analytics</Button>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
