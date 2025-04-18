import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  // Track billboard view
  await supabase
    .from('billboard_views')
    .insert({ billboard_id: id })
    .select()
  
  const { data, error } = await supabase
    .from('billboards')
    .select(`
      *,
      profiles:user_id (
        company_name,
        contact_name,
        contact_email,
        contact_phone
      )
    `)
    .eq('id', id)
    .single()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  if (!data) {
    return NextResponse.json({ error: 'Billboard not found' }, { status: 404 })
  }
  
  return NextResponse.json(data)
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const body = await request.json()
  
  const { data: userData, error: userError } = await supabase.auth.getUser()
  
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user owns the billboard
  const { data: billboard, error: billboardError } = await supabase
    .from('billboards')
    .select('user_id')
    .eq('id', id)
    .single()
  
  if (billboardError || !billboard) {
    return NextResponse.json({ error: 'Billboard not found' }, { status: 404 })
  }
  
  if (billboard.user_id !== userData.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  
  const { data, error } = await supabase
    .from('billboards')
    .update(body)
    .eq('id', id)
    .select()
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data[0])
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  
  const { data: userData, error: userError } = await supabase.auth.getUser()
  
  if (userError || !userData.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user owns the billboard
  const { data: billboard, error: billboardError } = await supabase
    .from('billboards')
    .select('user_id')
    .eq('id', id)
    .single()
  
  if (billboardError || !billboard) {
    return NextResponse.json({ error: 'Billboard not found' }, { status: 404 })
  }
  
  if (billboard.user_id !== userData.user.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }
  
  const { error } = await supabase
    .from('billboards')
    .delete()
    .eq('id', id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ success: true })
}
